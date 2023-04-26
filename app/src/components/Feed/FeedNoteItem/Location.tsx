import React from "react";

type LocationProps = {
    address: string | null;
};

const Location: React.FC<LocationProps> = ({ address }) => {
    if (address) {
        return <h1 className="text-sm text-gray-400">{address}</h1>;
    } else {
        return null;
    }
};

export default Location;
