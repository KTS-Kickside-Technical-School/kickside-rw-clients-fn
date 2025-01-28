import React from 'react';

interface NewsCardProps {
    title: string;
    category: string;
    timeAgo: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, category, timeAgo }) => {
    return (
        <div className="p-3">
                <div>
                    <span className="relative text-[#3E60F4] text-sm font-semibold  mb-2">
                        <span className="absolute top-[-4px] left-0 w-12 h-[2px] bg-[#3E60F4]"></span>
                        {category}
                    </span>
                    <h3 className="text-sm font-bold text-black mb-2">{title}</h3>
                    <p className="text-[#ACACAC] text-sm mt-2">{timeAgo}</p>
                </div>
        </div>
    );
};
export default NewsCard;