import { useDispatch, useSelector } from "react-redux";
import AdvertsmentSection from '../../Components/client/AdvertsmentSection'
import { AppDispatch, RootState } from "../../state/store";
import { decrement, increment, incrementAsync, incrementByAmount } from "../../state/counter/counterSlice";
const Homepage = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-2xl">
            <div className="homepage border-4 border-dashed border-yellow-300 p-4 rounded-lg shadow-lg">
                <div className="bg-primary">
                    {count}
                </div>
                <div>
                    <button onClick={() => dispatch(incrementAsync(100))}>Increment</button>
                    <button onClick={() => dispatch(decrement())}>Decrement</button>
                </div>
                <div className="ad-cont mt-6 bg-gray-800 p-6 rounded-md">
                    <AdvertsmentSection />
                </div>
            </div>
        </div>
    );

}


export default Homepage
