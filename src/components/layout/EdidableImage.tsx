import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }: any) {
  async function handleFileChange(ev: any) {
    const files = ev.target.files;
    if (files?.length > 0) {
      const data = new FormData();
      data.append('file', files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post('/api/upload', data);
          setLink(response.data.url);
          resolve(undefined);  // Fixed here
        } catch (error) {
          console.error('Error uploading file:', error);
          reject(error);  // Pass the error to reject
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
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={96} height={96} alt="avatar" />
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1"> No image</div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange}></input>
        <span className="block border rounded-lg p-2 text-center cursor-pointer">Edit</span>
      </label>
    </>
  );
}
