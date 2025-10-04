import Image from "next/image";
import { useState } from "react";
import { PROPERTYLISTINGSAMPLE, HERO_IMAGE, FILTERS } from "@/constants";
import Pill from "@/components/common/Pill";


export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProps = activeFilter
    ? PROPERTYLISTINGSAMPLE.filter((p) =>
      p.category.some((c) => c.toLowerCase() === activeFilter.toLowerCase())
    )
    : PROPERTYLISTINGSAMPLE;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-2">
      {/* Hero Section */}
      <section>
        <Image src={HERO_IMAGE} alt="Hero Image" width={1920} height={600} className="w-full h-auto object-cover" priority />
        <h1 className="md:text-6xl justify-center text-4xl font-bold text-white">
          Find your favorite place here!
        </h1>
        <p className="md:text-2xl text-lg text-white mt-4">
          The best prices for over 2 million properties worldwide.
        </p>
      </section>

      {/* Filters Section */}
      <section className="my-8 w-full px-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {FILTERS.map((filter) => (
            <Pill
              key={filter}
              label={filter}
              onClick={() => setActiveFilter((prev) => (prev === filter ? null : filter))}
              className={
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            />
          ))}
        </div>
      </section>
      {/* Property Listings Section */}
      <section className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProps.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No properties match &quot;{activeFilter}&quot;
            </p>
          )}
          {filteredProps.map((property) => (
            <div
              key={property.name}
              className="border rounded-lg overflow-hidden">
              <Image
                src={property.image}
                alt={property.name}
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{property.name}</h3>
                <p className="text-gray-600">
                  {property.address.city}, {property.address.country}
                </p>
                <p className="mt-2 text-gray-800 font-semibold">${property.price} / night</p>
                <p className="mt-1 text-yellow-500">Rating: {property.rating} ★</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
