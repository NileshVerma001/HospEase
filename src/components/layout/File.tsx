import axios from "axios";
import toast from "react-hot-toast";

export default function File({ link, setLink }: any) {
  async function handleFileChange(ev: any) {
    const files = ev.target.files;
    if (files?.length > 0) {
      const data = new FormData();
      data.append('file', files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post('/api/upload', data);
          setLink(response.data.url);
          resolve(undefined);
        } catch (error) {
          console.error('Error uploading file:', error);
          reject(error);
        }
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload Completed!',
        error: 'Unable to upload!',
      });
    }
  }

  return (
    <>
      {link && (
        <div className="rounded-lg w-full h-full mb-1 p-4 bg-gray-200">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-center text-blue-500 underline">
            View Uploaded Document
          </a>
        </div>
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">Upload document that proves the existence of your hospital</div>
      )}
      <label>
        <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange}></input>
        <span className="block border rounded-lg p-2 text-center cursor-pointer">Upload Document</span>
      </label>
    </>
  );
}
