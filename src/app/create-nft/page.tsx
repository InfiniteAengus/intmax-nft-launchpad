"use client";

import Button from "@/components/Button";
import InputForm from "@/components/Form/InputForm";
import TextareaForm from "@/components/Form/TextAreaForm";
import Dropzone from "@/components/DropZone";

import { Field, Form } from "react-final-form";
import CollectionCard from "@/components/CollectionCard/CollectionCard";
import { wagmiConfig } from "@/config/wagmiConfig";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { LAUNCHPAD_ADDRESS } from "@/config/contractAddress";
import { LaunchpadAbi } from "@/lib/abis/LaunchpadAbi";

export default function CreateNFT() {
  const handleSave = async (values: any) => {
    console.log(values);
    const hash = await writeContract(wagmiConfig, {
      address: LAUNCHPAD_ADDRESS,
      abi: LaunchpadAbi,
      functionName: "mintNFT",
      args: [
        0n,
        "ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/12",
      ],
    });
    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });
    console.log(receipt);
  };
  return (
    <div className="container">
      <h4 className="text-2xl font-bold">Create a new NFT</h4>

      <div className="grid grid-cols-2 md:grid-cols-1 space-x-5">
        <div className="mt-10">
          <div className="space-y-2">
            <p className="text-sm text-textDescription">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM. Max size: 100 MB
            </p>
            <Dropzone acceptType="image/*" setFile={() => {}} />
          </div>
          <Form
            onSubmit={handleSave}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <Field name="name">{(props) => <InputForm placeholder="Name" {...props} />}</Field>
                <Field name="description">{(props) => <TextareaForm placeholder="Description" {...props} />}</Field>
                <Field name="link">{(props) => <InputForm placeholder="Link" {...props} />}</Field>
                <Button className="!mt-10">Mint an NFT</Button>
              </form>
            )}
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-textDescription text-xl font-semibold">NFT Preview</p>
          <CollectionCard
            className="w-full max-w-[360px]"
            collection={{
              AssetCount: 4,
              BannerImage: "",
              ChainId: 1,
              CollectionName: "Test",
              CollectionSymbol: "Test",
              ContractAddress: "0x0000",
              CreatedAt: "",
              CreatorInfo: "",
              Description: "",
              ExternalUrl: "",
              Id: 123,
              ImageUrl: "",
              OwnerCount: 5,
              Wallet: "0x0000",
            }}
          />
        </div>
      </div>
    </div>
  );
}
