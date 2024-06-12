'use client';

import { useQuery } from '@tanstack/react-query';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import request from 'graphql-request';
import { useMemo, useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';

import Button from '@/components/Button';
import Dropzone from '@/components/DropZone';
import EmptyContent from '@/components/EmptyContent';
import InputForm from '@/components/Form/InputForm';
import TextareaForm from '@/components/Form/TextAreaForm';
import NFTCard from '@/components/NFTCard';
import Spinner from '@/components/Spinner';
import { LAUNCHPAD_ADDRESS } from '@/config/contractAddress';
import { GRAPHQL_SERVER } from '@/config/env';
import { wagmiConfig } from '@/config/wagmiConfig';
import { useIPFS } from '@/hooks/pinata';
import { useDisplayImage } from '@/hooks/useDisplayImage';
import { LaunchpadAbi } from '@/lib/abis/LaunchpadAbi';
import { collectionWithVariablesQueryDocument } from '@/lib/graphql/queries';

export default function CreateNFT({ params }: { params: any }) {
  const [nftMetadata, setNFTMetadata] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { pinAssetMetadata } = useIPFS();

  const { data, isLoading: isCollectionLoading } = useQuery({
    queryKey: ['collection', params.id],
    queryFn: () =>
      request(GRAPHQL_SERVER, collectionWithVariablesQueryDocument, {
        collectionId: params.id,
      }),
  });

  const collectionData = useMemo(() => {
    return data?.collectionCreateds[0];
  }, [data]);

  const onFormChange = (e: Record<string, any>) => {
    const { values } = e;
    setNFTMetadata((prev) => ({ ...prev, ...values }));
  };

  const handleSave = async () => {
    setLoading(true);
    const tokenURI = await pinAssetMetadata(nftMetadata);

    const hash = await writeContract(wagmiConfig, {
      address: LAUNCHPAD_ADDRESS,
      abi: LaunchpadAbi,
      functionName: 'mintNFT',
      args: [params.id, tokenURI],
    });

    await waitForTransactionReceipt(wagmiConfig, { hash });
    setLoading(false);
  };

  const { result: logoImage, uploader: uploadLogoImageFile } =
    useDisplayImage();

  if (isCollectionLoading) {
    return (
      <div className='flex flex-grow flex-col items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!isCollectionLoading && !collectionData) {
    return (
      <EmptyContent
        title='No collection exists'
        description='You can mint nfts on existing collections. Please navigate collections page and mint one of them.'
      />
    );
  }

  return (
    <div className='container'>
      <h4 className='text-2xl font-bold'>Create a new NFT</h4>
      <div className='grid grid-cols-2 space-x-5 md:grid-cols-1'>
        <div className='mt-10'>
          <div className='space-y-2'>
            <h5>NFT Image</h5>
            <p className='text-sm text-textDescription'>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM. Max size: 100
              MB
            </p>
            <Dropzone
              acceptType='image/*'
              setFile={(file: any) => {
                uploadLogoImageFile(file);
                setNFTMetadata((prev) => ({ ...prev, file: file }));
              }}
            />
          </div>
          <Form
            onSubmit={handleSave}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                <FormSpy onChange={onFormChange} />
                <Field name='name'>
                  {(props) => <InputForm placeholder='Name' {...props} />}
                </Field>
                <Field name='description'>
                  {(props) => (
                    <TextareaForm placeholder='Description' {...props} />
                  )}
                </Field>
                <Field name='external_url'>
                  {(props) => <InputForm placeholder='Link' {...props} />}
                </Field>
                <Button
                  className='!mt-10 flex w-full justify-center'
                  disabled={loading}>
                  {loading ? (
                    <Spinner width={20} height={20} />
                  ) : (
                    <>Mint an NFT</>
                  )}
                </Button>
              </form>
            )}
          />
        </div>

        <div className='flex flex-col items-center justify-center space-y-4'>
          <p className='text-xl font-semibold text-textDescription'>
            NFT Preview
          </p>
          <NFTCard nft={{ ...nftMetadata, image: logoImage }} />
        </div>
      </div>
    </div>
  );
}
