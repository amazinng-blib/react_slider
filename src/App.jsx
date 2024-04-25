import { ImageSlider } from '.';

const App = () => {
  return (
    <div>
      <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} page={1} />
    </div>
  );
};

export default App;
