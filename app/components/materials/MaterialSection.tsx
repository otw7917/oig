import MaterialCode from "./MaterialCode";
import MaterialControls from "./MaterialControls";
import MaterialPreview from "./MaterialPreview";

export default function MaterialSection() {
  return (
    <section className='flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] pt-16 px-4 md:px-6 lg:px-8'>
      <div className='w-full max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6 pt-2 text-left'>Materials</h1>

        <div className='border-2 rounded-lg shadow-md backdrop-blur-sm bg-white/10 dark:bg-black/10 p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='min-h-[300px] flex items-center justify-center border rounded-lg p-4 bg-white/5 dark:bg-black/5'>
              <MaterialPreview />
            </div>
            <div className='min-h-[300px] flex items-center justify-center border rounded-lg p-4 bg-white/5 dark:bg-black/5'>
              <MaterialControls />
            </div>
            <div className='md:col-span-2 min-h-[200px] flex items-center justify-center border rounded-lg p-4 bg-white/5 dark:bg-black/5 mt-0'>
              <MaterialCode />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
