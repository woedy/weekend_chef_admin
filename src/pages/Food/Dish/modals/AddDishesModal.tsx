import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl, baseUrlMedia, userToken } from '../../../../constants';
import Alert2 from '../../../UiElements/Alert2';

const AddDishModal = ({ isOpen, onClose, fetchData, dishCategories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [selectedCategory, setSelectedCategory] = useState(''); // Store the selected category id

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInputErrors({});
    setServerError('');

    let formValid = true;
    const errors = {};

    // Input validation
    if (name === '') {
      formValid = false;
      errors.name = 'Dish name is required.';
    }

    if (description === '') {
      formValid = false;
      errors.description = 'Description is required.';
    }

    if (basePrice === '') {
      formValid = false;
      errors.basePrice = 'Base price is required.';
    }

    if (selectedCategory === '') {
        formValid = false;
        errors.category = 'Category is required.';
        }


    if (!photo) {
      formValid = false;
      errors.photo = 'Food photo is required.';
    }

    if (!formValid) {
      setInputErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('base_price', basePrice);
    formData.append('category', selectedCategory);
    formData.append('photo', photo);

    const url = baseUrl + 'api/food/add-dish/';

    try {
      setLoading(true);

      // Ensure the token is retrieved correctly (log for debugging)
      console.log('Authorization Token:', userToken); // Debugging line

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          // Add Authorization token in headers if available
          Authorization: `Token ${userToken}`, // Ensure correct format (Bearer or Token)
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add dish');
      }

      console.log('Dish added successfully');

      // Close the modal and navigate to the All Dish Categories page
      onClose(); // Close the modal
      fetchData();
      setName('');
      setDescription('');
      setBasePrice('');
      setPhoto(null);

      setAlert({ message: 'Item added successfully', type: 'success' });
    } catch (error) {
      setAlert({
        message: 'An error occurred while adding the item',
        type: 'error',
      });
      console.error('Error adding dish:', error.message);
      setServerError(
        error.message || 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const imagePreview = photo ? URL.createObjectURL(photo) : null;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-end z-999 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl w-full h-full flex justify-center">
          <div className="w-full max-w-3xl">
            <h1 className="text-xl font-semibold mb-3">Add Dish</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-3xl">
              {/* Name */}
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="name"
                >
                  Dish Name
                </label>
                <input
                  className={`w-full rounded border ${
                    inputErrors.name ? 'border-red-500' : 'border-stroke'
                  } bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Soups"
                />
                {inputErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors.name}
                  </p>
                )}
              </div>




              {/* Description */}
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className={`w-full rounded border ${
                    inputErrors.description ? 'border-red-500' : 'border-stroke'
                  } bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Dish description"
                ></textarea>
                {inputErrors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors.description}
                  </p>
                )}
              </div>





       {/* Base price */}
       <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="name"
                >
                  Base price
                </label>
                <input
                  className={`w-full rounded border ${
                    inputErrors.basePrice ? 'border-red-500' : 'border-stroke'
                  } bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                  id="basePrice"
                  name="basePrice"
                  type="text"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="20"
                />
                {inputErrors.basePrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors.basePrice}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-5 mb-7">
        {loading ? (
          <div>Loading...</div>
        ) : (
         
            <div className="relative z-20 bg-white dark:bg-form-input">
              {/* Left Icon */}
           
              <span class="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                        fill="#637381"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                        fill="#637381"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>



              {/* Select Dropdown */}
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="relative z-20 w-full appearance-none rounded border border-gray-200 py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-gray-500 dark:bg-form-input dark:text-white"
              >
                <option value="" disabled className="text-body dark:text-bodydark">
                  Select a Category
                </option>
                {dishCategories.map((category) => (
                  <option key={category.id} value={category.id} className="text-body dark:text-bodydark">
                    {category.name}
                  </option>
                ))}
              </select>
              {/* Right Icon */}
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
            </div>
        
        )}
      </div>









              {/* Photo Upload */}
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="photo"
                >
                  Dish Photo
                </label>
                <input
                  className={`w-full rounded border ${
                    inputErrors.photo ? 'border-red-500' : 'border-stroke'
                  } bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {inputErrors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors.photo}
                  </p>
                )}

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Dish Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-600 rounded-lg flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M5.303 5.303a9 9 0 1112.394 12.394 9 9 0 01-12.394-12.394z"
                    />
                  </svg>
                  <p className="text-sm">{serverError}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-4.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Cancel
                </button>

                {loading ? (
                  <div
                    role="status"
                    className="flex flex-col items-center justify-center h-full space-y-4"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="text-green">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save & Continue
                  </button>
                )}
              </div>

              {/* Render the alert */}
              <Alert2
                message={alert.message}
                type={alert.type}
                onClose={closeAlert}
              />
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddDishModal;
