"use client";

import Button from "@/components/Button";
import InputForm from "@/components/Form/InputForm";
import TextareaForm from "@/components/Form/TextAreaForm";
import Dropzone from "@/components/DropZone";

import { Field, Form, FormSpy } from "react-final-form";
import { wagmiConfig } from "@/config/wagmiConfig";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { LAUNCHPAD_ADDRESS } from "@/config/contractAddress";
import { LaunchpadAbi } from "@/lib/abis/LaunchpadAbi";
import { useState } from "react";
import NFTCard from "@/components/NFTCard";
import { useDisplayImage } from "@/hooks/useDisplayImage";
import { useIPFS } from "@/hooks/pinata";
import PreviousMap from "postcss/lib/previous-map";

export default function CreateNFT({ params }: { params: any }) {
  const [nftMetadata, setNFTMetadata] = useState<Record<string, any>>({});
  const { pinAssetMetadata } = useIPFS();

  const onFormChange = (e: Record<string, any>) => {
    const { values } = e;
    setNFTMetadata((prev) => ({ ...prev, ...values }));
  };

  console.log(nftMetadata);

  const handleSave = async () => {
    const tokenURI = await pinAssetMetadata(nftMetadata);

    const hash = await writeContract(wagmiConfig, {
      address: LAUNCHPAD_ADDRESS,
      abi: LaunchpadAbi,
      functionName: "mintNFT",
      args: [params.id, tokenURI],
    });

    await waitForTransactionReceipt(wagmiConfig, { hash });
  };

  const { result: logoImage, uploader: uploadLogoImageFile } = useDisplayImage();

  return (
    <div className='container'>
      <h4 className='text-2xl font-bold'>Create a new NFT</h4>

      <div className='grid grid-cols-2 md:grid-cols-1 space-x-5'>
        <div className='mt-10'>
          <div className='space-y-2'>
            <h5>NFT Image</h5>
            <p className='text-sm text-textDescription'>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM. Max size: 100 MB
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
              <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
                <FormSpy onChange={onFormChange} />
                <Field name='name'>{(props) => <InputForm placeholder='Name' {...props} />}</Field>
                <Field name='description'>{(props) => <TextareaForm placeholder='Description' {...props} />}</Field>
                <Field name='external_url'>{(props) => <InputForm placeholder='Link' {...props} />}</Field>
                <Button className='!mt-10'>Mint an NFT</Button>
              </form>
            )}
          />
        </div>

        <div className='flex flex-col items-center justify-center space-y-4'>
          <p className='text-textDescription text-xl font-semibold'>NFT Preview</p>
          <NFTCard nft={{ ...nftMetadata, image: logoImage }} />
        </div>
      </div>
    </div>
  );
}
