import LoginButton from "./LoginButton";

export default function LoginPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-sm p-6 rounded flex flex-col justify-center '>
        <h1 className='text-2xl font-semibold mb-6 text-center'>Sign in</h1>

        <LoginButton />
      </div>
    </main>
  );
}
