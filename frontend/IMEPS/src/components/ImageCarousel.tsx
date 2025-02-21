import {useEffect, useState} from "react";
import {Image} from "@chakra-ui/react";

const ImageCarousel = ({images}: { images: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    return (
        <Image src={images[index]} alt={`Image ${index + 1}`} width="100%" height="100%"/>
    );
};

export default ImageCarousel;
