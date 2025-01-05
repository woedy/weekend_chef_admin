
import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

const DishDetails = () => {


  const tabs = [
    { label: "Related foods", content: <RelatedFoods /> },
    { label: "Custom Options", content: <CustomOptions /> },
    { label: "Ingredient", content: <Ingredients /> },
    { label: "Gallery", content: <Gallery /> },
    { label: "Chefs", content: <Chefs /> },
  ];

  const [activeTab, setActiveTab] = useState(0);




  const item = {
    title: 'Cheese Burger',
    description:
      'A delicious cheeseburger with fresh ingredients and a side of fries.',
    price: 12.99,
    category: 'Main Course',
    image: 'https://via.placeholder.com/500', // Replace with your image link
  };



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
                  src={item.image}
                  alt={item.title}
                  className="w-100 h-100 rounded-lg shadow-lg"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl mt-5 font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600">
                  <span className="font-bold">ID: </span>DI-5659LBHC-SH
                </p>
                <p className="text-gray-600">{item.description}</p>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-gray-800">{`$${item.price}`}</p>
                  <div className="text-sm text-white bg-primary inline-block px-4 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>

                <p className="text-gray-600 ">100 Magerine paint bucket</p>
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
            className={`py-2 px-4 font-medium ${activeTab === index ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-primary'}`}
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




const RelatedFoods = () => {
  const relatedFoods = [
    { id: 1, name: "Spaghetti", image: "https://via.placeholder.com/200x200", price: "$12.99" },
    { id: 2, name: "Burger", image: "https://via.placeholder.com/200x200", price: "$8.99" },
    { id: 3, name: "Pizza", image: "https://via.placeholder.com/200x200", price: "$15.99" },
  ];

  return (
    <div className="">
            <div className='flex justify-between'>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Foods</h3>
      <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">Add related food</button>
    
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-md font-medium text-gray-800">{food.name}</h4>

              <div className='flex items-center justify-between'>

              <p className="text-sm text-gray-500 mt-2">{food.price}</p>
              <div className="text-sm text-white bg-primary inline-block px-4 py-1 rounded-full">
                    Soups
                  </div>
              </div>

          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const CustomOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, name: "Small Size", image: "https://via.placeholder.com/150x150" },
    { id: 2, name: "Medium Size", image: "https://via.placeholder.com/150x150" },
    { id: 3, name: "Large Size", image: "https://via.placeholder.com/150x150" },
    { id: 4, name: "Extra Cheese", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 6, name: "Vegetarian", image: "https://via.placeholder.com/150x150" },
  ];

  const handleSelection = (id) => {
    setSelectedOption(id === selectedOption ? null : id); // Toggle selection
  };

  return (
    <div className="">
      <div className='flex justify-between'>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Custom Options</h3>
      <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">Add Custom Option</button>
    
      </div>
      <div className="flex flex-wrap gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`flex flex-col items-center w-32 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 
              ${selectedOption === option.id ? 'border-4 border-primary' : ''}`}
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <span className="text-center text-gray-800 font-medium">{option.name}</span>
            <span className="text-center text-gray-800 text-sm">Ghc 200</span>
            <span className="text-center text-gray-800 text-xs">1 pound</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const Ingredients = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, name: "Small Size", image: "https://via.placeholder.com/150x150" },
    { id: 2, name: "Medium Size", image: "https://via.placeholder.com/150x150" },
    { id: 3, name: "Large Size", image: "https://via.placeholder.com/150x150" },
    { id: 4, name: "Extra Cheese", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 5, name: "Pepperoni", image: "https://via.placeholder.com/150x150" },
    { id: 6, name: "Vegetarian", image: "https://via.placeholder.com/150x150" },
  ];

  const handleSelection = (id) => {
    setSelectedOption(id === selectedOption ? null : id); // Toggle selection
  };

  return (
    <div className="">
      <div className='flex justify-between'>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h3>
      <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">Add Ingredient</button>
    
      </div>
  <div className="flex flex-wrap gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`flex flex-col items-center w-32 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 
              ${selectedOption === option.id ? 'border-4 border-primary' : ''}`}
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <span className="text-center text-gray-800 font-medium">{option.name}</span>
            <span className="text-center text-gray-800 text-sm">Ghc 200</span>
            <span className="text-center text-gray-800 text-xs">1 pound</span>
          </div>
        ))}
      </div>
    </div>
  );
};




const Gallery = () => {
  const galleryImages = [
    "https://via.placeholder.com/400x400",
    "https://via.placeholder.com/400x400",
    "https://via.placeholder.com/400x400",
  ];

  return (
    <div className="">
      <div className='flex justify-between'>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
      <button className="bg-primary h-7 text-white px-4 text-sm py-1 rounded-xl">Add image</button>
    
      </div>      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};






const Chefs = () => {
  const chefs = [
    { name: "Chef John", bio: "Expert in Italian cuisine", image: "https://via.placeholder.com/100" },
    { name: "Chef Maria", bio: "Specializes in desserts", image: "https://via.placeholder.com/100" },
  ];

  return (
    <div className="">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Chefs</h3>
      <div className="flex space-x-6">
        {chefs.map((chef, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img src={chef.image} alt={chef.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="text-md font-semibold text-gray-800">{chef.name}</h4>
              <p className="text-sm text-gray-600">{chef.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
