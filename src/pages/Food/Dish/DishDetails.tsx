import { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { baseUrl, baseUrlMedia, userToken } from '../../../constants';
import { useParams } from 'react-router-dom';

const DishDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { dish_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [dishDetails, setDishDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ customOptions, setCustomOption] = useState([]);
  const [relatedFoods, setRelatedFoods] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const tabs = [
    { label: 'Ingredient', content: <Ingredients ingredients={ingredients} /> },
    { label: 'Custom Options', content: <CustomOptions options={customOptions} /> },
    { label: 'Related foods', content: <RelatedFoods relatedFoods={relatedFoods} /> },
    { label: 'Chefs', content: <Chefs chefs={chefs} /> },
    { label: 'Gallery', content: <Gallery galleryImages={galleryImages} /> },
  ];

  const item = {
    title: 'Cheese Burger',
    description:
      'A delicious cheeseburger with fresh ingredients and a side of fries.',
    price: 12.99,
    category: 'Main Course',
    image: 'https://via.placeholder.com/500', // Replace with your image link
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}api/food/get-dish-details/?dish_id=${encodeURIComponent(
          dish_id,
        )}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDishDetails(data.data.dish_details);
      setIngredients(data.data.ingredients);
      setCustomOption(data.data.custom_options);
      setRelatedFoods(data.data.related_foods);
      setChefs(data.data.chefs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, dish_id, userToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Breadcrumb pageName="Dish / Details" />

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 rounded-sm border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Item Image */}
              <div className="flex-2">
                <img
                  src={
                    dishDetails.cover_photo
                      ? `${baseUrlMedia}${dishDetails.cover_photo}`
                      : item.image
                  }
                  alt={item.title}
                  className="w-100 h-100 rounded-lg shadow-lg object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl mt-5 font-semibold text-gray-800">
                  {dishDetails.name}
                </h2>
                <p className="text-gray-600">
                  <span className="font-bold">ID: </span>
                  {dishDetails.dish_id}
                </p>
                <p className="text-gray-600">{dishDetails.description}</p>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-gray-800">{`Ghc ${dishDetails.base_price}`}</p>
                  <div className="text-sm text-white bg-primary inline-block px-4 py-1 rounded-full">
                    {dishDetails.category_name}
                  </div>
                </div>

                <p className="text-gray-600 ">{dishDetails.value}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 rounded-sm border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark"></div>
      </div>

      <div className="w-full  mx-auto mt-10">
        {/* Tab buttons */}
        <div className="flex space-x-4 border-b border-gray-100">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 font-medium ${
                activeTab === index
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4 bg-gray-100 mt-1 rounded-md">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default DishDetails;




const Ingredients = ({ ingredients }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (id) => {
    setSelectedOption(id === selectedOption ? null : id); // Toggle selection
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Ingredients
        </h3>
        <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">
          Add Ingredient
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.ingredient_id}
            onClick={() => handleSelection(ingredient.id)}
            className={`flex flex-col items-center w-32 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 
              ${
                selectedOption === ingredient.ingredient_id
                  ? 'border-4 border-primary'
                  : ''
              }`}
          >
            <img
              src={`${baseUrlMedia}${ingredient.photo}`}
              alt={ingredient.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <span className="text-center text-gray-800 font-medium">
              {ingredient.name}
            </span>
            <span className="text-center text-gray-800 text-sm">
              Ghc {ingredient.price}
            </span>
            <span className="text-center text-gray-800 text-xs">{`${ingredient.quantity} ${ingredient.unit}` }</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomOptions = ({options}) => {
  const [selectedOption, setSelectedOption] = useState(null);


  const handleSelection = (id) => {
    setSelectedOption(id === selectedOption ? null : id); // Toggle selection
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Custom Options
        </h3>
        <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">
          Add Custom Option
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {options.map((option) => (
          <div
            key={option.custom_option_id}
            onClick={() => handleSelection(option.custom_option_id)}
            className={`flex flex-col items-center w-32 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 
              ${selectedOption === option.custom_option_id ? 'border-4 border-primary' : ''}`}
          >
            <img
              src={`${baseUrlMedia}${option.photo}`}
              alt={option.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <span className="text-center text-gray-800 font-medium">
              {option.name}
            </span>
            <span className="text-center text-gray-800 text-sm">Ghc {option.price}</span>
            <span className="text-center text-gray-800 text-xs">{`${option.quantity} ${option.unit}` }</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RelatedFoods = ({relatedFoods}) => {


  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Related Foods
        </h3>
        <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">
          Add related food
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={`${baseUrlMedia}${food.cover_photo}`}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-md font-medium text-gray-800">{food.name}</h4>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 mt-2">{food.base_price}</p>
                <div className="text-sm text-white bg-primary inline-block px-4 py-1 rounded-full">
                  {food.category_name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




const Chefs = ({chefs}) => {


  return (
    <div className="">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Chefs</h3>
      <div className="flex space-x-6">
        {chefs.map((chef, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img
              src={`${baseUrlMedia}${chef.user.photo}`}
              alt={`${chef.user.first_name}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-md font-semibold text-gray-800">
              {`${chef.user.first_name} ${chef.user.last_name}`}
              </h4>
              <p className="text-sm text-gray-600"></p>{`${chef.kitchen_location}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Gallery = ({galleryImages}) => {

  return (
    <div className="">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
        <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">
          Add image
        </button>
      </div>{' '}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`${baseUrlMedia}${image.photo}`}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
