import React, { useEffect, useState } from 'react';
import { getAllVehicles } from '../../service/getvehicle';
import VehicleDataTable from '../DashBoardTable/data-table';
import { useDispatch, useSelector } from 'react-redux';
import { setAvgmsrp, setinventorycount, setjsonData, setpriceStats } from '@/slices/data';

const DashBoard = () => {
    const [vehicleData, setAllVehicle] = useState([]);
    const [priceStats, setPricestats] = useState([]);
    const [involentryCount, setInVolentrory] = useState();
    const [avgmsrp, setavgmsrp] = useState();
    const dispatch = useDispatch();
    const adminData = useSelector((state)=>state.admin);
    console.log("admin", adminData);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllVehicles();
            console.log("Data =>", data);
            if (data && data.status === 200) {
                setAllVehicle(data.data.jsonData);
                dispatch(setjsonData(data.data.jsonData));  

                setPricestats(data.data.priceStats);
                dispatch(setpriceStats(data.data.priceStats))

                setInVolentrory(data.data.result.inventory_count);
                dispatch(setinventorycount(data.data.result.inventory_count))

                setavgmsrp(data.data.result.avg_msrp);
                dispatch(setAvgmsrp(data.data.result.avg_msrp));
            } else {
                console.error("Failed to fetch vehicle data");
            }
        };

        fetchData(); // Call the async function
    }, []); // Empty dependency array means this effect runs once on mount

    console.log("vehicleData =", vehicleData);

    return (
        <div>
            {adminData && <div className='w-[95%] mx-auto'><VehicleDataTable priceStats={adminData.priceStats} avgmsrp={adminData.avg_msrp} data={adminData.jsonData} inventoryCount={adminData.inventory_count} /></div>}
        </div>
    );
};

export default DashBoard;