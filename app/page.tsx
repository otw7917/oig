import Header from "./components/layout/Header";
import MaterialSection from "./components/materials/MaterialSection";

export default function Home() {
  return (
    <>
      <Header />
      <MaterialSection />
      <section className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-4xl font-bold mb-4'>
          Welcome to the AI Image Generator
        </h1>
        <p className='text-lg mb-8'>Create stunning images with AI!</p>
        <div className='flex space-x-4'>
          <a
            href='/gen-image'
            className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Generate Image
          </a>
        </div>
        <p className='mt-8 text-gray-600'>
          Explore the power of AI in image generation. Use the links above to
          get started!
        </p>
      </section>
    </>
  );
}
