import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

import './styles.css';

export function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error?.message);
    }
  }

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images?.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === images?.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading data | Please wait</div>;
  }

  if (errorMessage !== null) {
    return <div>Error Occured</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handlePrevious}
      />
      {images?.map((imageItem, index) => {
        return (
          <img
            key={imageItem.id}
            src={imageItem?.download_url}
            alt={imageItem?.download_url}
            className={
              currentSlide === index
                ? 'current-image'
                : 'current-image hide-current-image'
            }
          />
        );
      })}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleNext}
      />
      <span className="circle-indicators">
        {images?.map((_, index) => (
          <button
            key={index}
            className={
              currentSlide === index
                ? 'current-indicator'
                : 'current-indicator inactive-indicator'
            }
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </span>
    </div>
  );
}
