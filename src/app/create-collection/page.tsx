"use client";

import Button from "@/components/Button";
import InputForm from "@/components/Form/InputForm";
import TextareaForm from "@/components/Form/TextAreaForm";
import Dropzone from "@/components/DropZone";

import { Field, Form } from "react-final-form";
import CollectionCard from "@/components/CollectionCard/CollectionCard";

export default function CreateCollection() {
  const handleSave = () => {};
  return (
    <div className='container'>
      <h4 className='text-2xl font-bold'>Create a new collection</h4>
      <p className='text-textDescription'>
        All the collections that are minted through this platform are ERC721 collections
      </p>

      <div className='grid grid-cols-2 md:grid-cols-1 space-x-5'>
        <div className='mt-10'>
          <div className='grid grid-cols-2 gap-4'>
            <Dropzone acceptType='image/*' setFile={() => {}} />
            <Dropzone acceptType='image/*' setFile={() => {}} />
          </div>
          <Form
            onSubmit={handleSave}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
                <Field name='name'>{(props) => <InputForm placeholder='Name' {...props} />}</Field>
                <Field name='symbol'>{(props) => <InputForm placeholder='Symbol' {...props} />}</Field>
                <Field name='description'>{(props) => <TextareaForm placeholder='Description' {...props} />}</Field>
                <Field name='link'>{(props) => <InputForm placeholder='Link' {...props} />}</Field>
                <Button className='!mt-10'>Create a collection</Button>
              </form>
            )}
          />
        </div>

        <div className='flex flex-col items-center justify-center space-y-4'>
          <p className='text-textDescription text-xl font-semibold'>Collection Preview</p>
          <CollectionCard
            className='w-full max-w-[360px]'
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
