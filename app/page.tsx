import MaterialSection from "./components/materials/MaterialSection";

export default function Home() {
  return (
    <div className='min-h-screen w-full'>
      <MaterialSection />
      <section className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800'>
        <div className='backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg p-8 mx-4 max-w-2xl'>
          <h1 className='text-4xl font-bold mb-4 text-white'>
            Welcome to the AI Image Generator
          </h1>
          <p className='text-lg mb-8 text-white/90'>Create stunning images with AI!</p>
          <div className='flex space-x-4'>
            <a
              href='/gen-image'
              className='px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 backdrop-blur-sm border border-white/20 transition-all shadow-lg'
            >
              Generate Image
            </a>
          </div>
          <p className='mt-8 text-white/70'>
            Explore the power of AI in image generation. Use the links above to
            get started!
          </p>
        </div>
      </section>
    </div>
  );
}
