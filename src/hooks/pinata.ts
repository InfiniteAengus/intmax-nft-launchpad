import axios from 'axios';
import { useCallback, useState } from 'react';

import { PINATA_API_KEY, PINATA_API_SECRET } from '@/config/env';

const pinataGatewayUrl = 'ipfs://';

export const useIPFS = () => {
  const [progress, setProgress] = useState<number | null>(null);

  const pinData = useCallback(
    async (
      url: string,
      data: any,
      options: {
        isFormData: boolean;
        isList: boolean;
        shouldUpdateProgress?: boolean;
      }
    ) => {
      const {
        isFormData = false,
        isList = false,
        shouldUpdateProgress = true,
      } = options;

      try {
        const { data: responseData } = await axios.post(url, data, {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': isFormData
              ? `multipart/form-data; boundary=${data._boundary}`
              : 'application/json',
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
          },
          onUploadProgress: (d: any) => {
            if (shouldUpdateProgress)
              setProgress(Math.round((100 * d.loaded) / d.total));
          },
        });
        // setPinataUrl(pinata_gateway_url + responseData.IpfsHash + isList ? '/' : '');
        setProgress(null);
        return `${pinataGatewayUrl}${responseData.IpfsHash}${isList ? '/' : ''}`;
      } catch (error) {
        setProgress(null);
        throw new Error();
      }
    },
    []
  );

  const pinJSON = useCallback(async (jsonData: any, options: any = {}) => {
    const pinataUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    return await pinData(pinataUrl, jsonData, options);
  }, []); //eslint-disable-line

  const pinFile = useCallback(async (file: any, options: any = {}) => {
    const pinataUrl = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const data = new FormData();
    data.append('file', file);

    return await pinData(pinataUrl, data, { ...options, isFormData: true });
  }, []); //eslint-disable-line

  const pinFileList = useCallback(
    async (files: any[], nameWithOrder: any = 0) => {
      const pinataUrl = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

      const fData = new FormData();
      for (let i = 0; i < files.length; i++) {
        fData.append(
          'file',
          files[i],
          `a/${!nameWithOrder ? files[i].name : i}`
        );
      }
      fData.append(
        'pinataMetadata',
        JSON.stringify({
          name: `metadata-${Date.now()}`,
        })
      );

      return await pinData(pinataUrl, fData, {
        isFormData: true,
        isList: true,
      });
    },
    [] //eslint-disable-line
  );

  const pinMetadataList = useCallback(async (list: any[]) => {
    const pinataUrl = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const fData = new FormData();
    for (let i = 0; i < list.length; i++) {
      const file = new File(
        [JSON.stringify(list[i], null, 2)],
        `metadata/${i}`,
        {
          type: 'application/json',
        }
      );
      fData.append('file', file);
    }

    return await pinData(pinataUrl, fData, { isFormData: true, isList: true });
  }, []); //eslint-disable-line

  const pinContractMetadata = useCallback(async (metadata: any) => {
    let pinataImageUrl = null;
    let pinataBannerUrl = null;

    if (metadata.logoImageFile) {
      pinataImageUrl = await pinFile(metadata.logoImageFile, {
        shouldUpdateProgress: false,
      });
    }

    if (metadata.bannerImageFile) {
      pinataBannerUrl = await pinFile(metadata.bannerImageFile, {
        shouldUpdateProgress: false,
      });
    }

    const updatedMetadata = {
      ...metadata,
      name: metadata.CollectionName,
      symbol: metadata.CollectionSymbol,
      description: metadata.Description,
      external_url: metadata.ExternalUrl,
      image_url: pinataImageUrl ?? metadata.ImageUrl,
      banner_url: pinataBannerUrl ?? metadata.BannerImage,
      category: metadata.CategoryId,
    };

    const pinataUrl = await pinJSON(updatedMetadata, {
      shouldUpdateProgress: false,
    });
    return pinataUrl;
  }, []); //eslint-disable-line

  const pinAssetMetadata = useCallback(async (metadata: any) => {
    let imageUrl = metadata.ImageUrl;

    if (metadata.file) {
      const pinataUrl = await pinFile(metadata.file, {
        shouldUpdateProgress: false,
      });
      imageUrl = pinataUrl;
    }

    const updatedMetadata = {
      name: metadata.name,
      description: metadata.description,
      image: imageUrl,
      external_url: metadata.external_url,
    };

    const tokenURI = await pinJSON(updatedMetadata, {
      shouldUpdateProgress: false,
    });

    return tokenURI;
  }, []); //eslint-disable-line

  return {
    progress,
    pinJSON,
    pinFile,
    pinMetadataList,
    pinFileList,
    pinContractMetadata,
    pinAssetMetadata,
  };
};
