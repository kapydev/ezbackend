import toast from 'react-hot-toast';

export default function promiseToast(fetchPromise: Promise<any>) {
  toast.promise(
    fetchPromise,
    {
      loading: 'Loading',
      success: 'Updated',
      error: (err) => err.toString(),
    },
    { error: { duration: 5000 } },
  );
}
