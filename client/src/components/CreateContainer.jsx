import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { storage } from '../firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import { getAllFoods, saveItems } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CreateContainer = () => {
  const [{ foods }, dispatch] = useStateValue();

  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgess =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(uploadProgess);
      },
      (err) => {
        setFields(true);
        setMsg('Error while uploading, please try again🙇🏻‍♂️');
        toast.error(err);
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 5000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg('image uploaded successfully');
          toast.success('image uploaded successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 5000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setMsg('image uploaded successfully');
      setTimeout(() => {
        setFields(false);
      }, 5000);
      toast.success('image deleted successfully');
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg('please fill all the inputs!🙇🏻‍♂️');
        toast.warning('please fill all the inputs!');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 5000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imgURL: imageAsset,
          category,
          calories,
          qty: 1,
          price,
        };
        saveItems(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Data uploaded successfully');
        toast.success('Data uploaded successfully');
        clearData();
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 5000);
      }
    } catch (error) {
      setFields(true);
      setMsg('Error while uploading, please try again🙇🏻‍♂️');
      toast.error(error);
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
      }, 5000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle('');
    setCategory('Select Category');
    setPrice('');
    setCalories('');
    setImageAsset(null);
  };

  const fetchData = async () => {
    await getAllFoods().then((data) =>
      dispatch({ type: actionType.SET_FOODS, foods: data })
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-800 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            value={title}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textColor outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="Select Category" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  value={item.urlParamName}
                  key={item.id}
                  className="text-base outline-none capitalize border-0 bg-white text-headingColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label
                    htmlFor="image"
                    className="w-full flex h-full flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="w-full flex h-full flex-col items-center justify-center cursor-pointer gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-600" />
                      <p className="text-gray-500 hover:text-gray-600">
                        Upload Image
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      id="image"
                      className="hidden"
                      accept="image/*"
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="image_assets"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 gap-2 flex items-center">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textColor outline-none"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 gap-2 flex items-center">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textColor outline-none"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2  rounded-lg font-semibold text-white "
            onClick={saveDetails}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
