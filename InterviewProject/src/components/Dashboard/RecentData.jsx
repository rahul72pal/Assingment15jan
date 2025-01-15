import React from 'react';

// Correctly destructure props in DivComponents
const DivComponents = ({ label, value }) => {
    //console.log("data =", label, value); // Log the label and value
    return (
        <div className='px-4 py-6 bg-white flex flex-col'>
            <span className='text-xl font-semibold w-[118px]'>{value}</span>
            <span className='text-[#FF9926] font-semibold'>{label}:</span>
        </div>
    );
};

const PriceStsis = ({ data }) => { // Change obj to data
    //console.log(data); // Log the data object
    if (!data || typeof data !== 'object') {
        return <div>No data available</div>; // or handle it in another way
    }

    const keys = Object.keys(data);
    const values = Object.values(data);

    return (
        <div className='flex gap-5'>
            {/* number of units */}
            {keys.length > 0 && values.length > 0 && (
                <>
                    <DivComponents label={`# ${keys[0]}`} value={values[0]} />
                    <DivComponents label={keys[1]} value={`$ ${values[1]}`} />
                    <DivComponents label={keys[2]} value={`$ ${values[2]}`} />
                </>
            )}
        </div>
    );
};

// In RecentData, no changes needed
const RecentData = ({ prices }) => {
    //console.log("Prices", prices); // Log the prices array
    return (
        <div className='flex gap-5 overflow-x-auto py-4'>
            {prices && prices.length > 0 && prices.map((price, index) => (
                <PriceStsis key={index} data={price} /> // Pass the price object as data
            ))}
        </div>
    );
};

export default RecentData;