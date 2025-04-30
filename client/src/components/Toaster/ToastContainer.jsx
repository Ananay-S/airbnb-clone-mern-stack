import { Toaster } from 'react-hot-toast';

const ToastContainer = () => {
  return (
    <Toaster 
        position="bottom-right" 
        reverseOrder={false} 
        toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        }}
    />
  );
}

export default ToastContainer;