import Image from "next/image";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded shadow p-3 flex flex-col items-center">
      <Image src={property.image} alt={property.title} width={180} height={120} style={{ borderRadius: 8 }} />
      <div className="font-bold mt-2">{property.title}</div>
      <div className="text-blue-600">{property.price}</div>
    </div>
  );
}