'use client';

import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';

import Button from '@/components/Button';
import CollectionCard from '@/components/CollectionCard';
import Dropzone from '@/components/DropZone';
import InputForm from '@/components/Form/InputForm';
import TextareaForm from '@/components/Form/TextAreaForm';
import { LAUNCHPAD_ADDRESS } from '@/config/contractAddress';
import { wagmiConfig } from '@/config/wagmiConfig';
import { useIPFS } from '@/hooks/pinata';
import { useDisplayImage } from '@/hooks/useDisplayImage';
import { LaunchpadAbi } from '@/lib/abis/LaunchpadAbi';

export default function CreateCollection() {
  const [collectionMetadata, setCollectionMetadata] = useState<
    Record<string, any>
  >({});
  const { pinFile } = useIPFS();

  const onFormChange = (e: Record<string, any>) => {
    const { values } = e;
    setCollectionMetadata((prev) => ({ ...prev, ...values }));
  };

  const handleSave = async () => {
    const logoImage = await pinFile(collectionMetadata.logoImageFile);
    const bannerImage = await pinFile(collectionMetadata.bannerImageFile);

    const hash = await writeContract(wagmiConfig, {
      address: LAUNCHPAD_ADDRESS,
      abi: LaunchpadAbi,
      functionName: 'createCollection',
      args: [
        bannerImage, // banner url
        logoImage, // logo url
        collectionMetadata.Name, // collection name
        collectionMetadata.Symbol, // collection symbol
        1000n, // max supply
      ],
    });
    await waitForTransactionReceipt(wagmiConfig, { hash });
  };

  const { result: logoImage, uploader: uploadLogoImageFile } =
    useDisplayImage();
  const { result: bannerImage, uploader: uploadBannerImageFile } =
    useDisplayImage();

  return (
    <div className='container'>
      <h4 className='text-2xl font-bold'>Create a new collection</h4>
      <p className='text-textDescription'>
        All the collections that are minted through this platform are ERC721
        collections
      </p>

      <div className='grid grid-cols-2 space-x-5 md:grid-cols-1'>
        <div className='mt-10'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <h5>Logo Image</h5>
              <p className='text-sm text-textDescription'>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM. Max size:
                100 MB
              </p>
              <Dropzone
                acceptType='image/*'
                setFile={(values: any) => {
                  uploadLogoImageFile(values);
                  setCollectionMetadata((prev) => ({
                    ...prev,
                    logoImageFile: values,
                  }));
                }}
              />
            </div>

            <div className='space-y-2'>
              <h5>Banner Image</h5>
              <p className='text-sm text-textDescription'>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM. Max size:
                100 MB
              </p>
              <Dropzone
                acceptType='image/*'
                setFile={(values: any) => {
                  uploadBannerImageFile(values);
                  setCollectionMetadata((prev) => ({
                    ...prev,
                    bannerImageFile: values,
                  }));
                }}
              />
            </div>
          </div>
          <Form
            onSubmit={handleSave}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                <FormSpy onChange={onFormChange} />
                <Field name='Name'>
                  {(props) => <InputForm placeholder='Name' {...props} />}
                </Field>
                <Field name='Symbol'>
                  {(props) => <InputForm placeholder='Symbol' {...props} />}
                </Field>
                <Field name='Description'>
                  {(props) => (
                    <TextareaForm placeholder='Description' {...props} />
                  )}
                </Field>
                <Field name='ExternalUrl'>
                  {(props) => <InputForm placeholder='Link' {...props} />}
                </Field>
                <Button className='!mt-10'>Create a collection</Button>
              </form>
            )}
          />
        </div>

        <div className='flex flex-col items-center justify-center space-y-4'>
          <p className='text-xl font-semibold text-textDescription'>
            Collection Preview
          </p>
          <CollectionCard
            className='w-full !max-w-[320px]'
            collection={{
              AssetCount: 0,
              BannerImage:
                (typeof bannerImage === 'string' && bannerImage.toString()) ||
                '',
              ChainId: 1,
              CollectionName: collectionMetadata.Name,
              CollectionSymbol: collectionMetadata.Symbol,
              ContractAddress: '',
              CreatedAt: '',
              CreatorInfo: '',
              Description: collectionMetadata.Description,
              ExternalUrl: collectionMetadata.Link,
              Id: 123,
              ImageUrl:
                (typeof logoImage === 'string' && logoImage.toString()) || '',
              OwnerCount: 0,
              Wallet: '0x0000',
            }}
          />
        </div>
      </div>
    </div>
  );
}
