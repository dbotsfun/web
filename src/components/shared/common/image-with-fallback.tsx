"use client";

import DefaultImage from "@/../public/default.png"
import { DEFAULT_AVATAR } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc ?? DEFAULT_AVATAR);
            }}
            blurDataURL={DefaultImage.blurDataURL}
            placeholder="blur"
        />
    );
};

export default ImageWithFallback