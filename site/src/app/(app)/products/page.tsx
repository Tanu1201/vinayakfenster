import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { getCategories } from "../(home)/actions"

const Products: NextPage = async () => {
  const [topCategories] = await Promise.all([getCategories()])
  return (
    <div className="w-full h-full">
      <div className="w-full h-[40vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/mynewproject-92da4.appspot.com/o/pexels-steve-851238.jpg?alt=media&token=16c865d4-8fc6-4e69-bda6-e27243535438')] bg-cover bg-center flex items-center">
        <h2 className="text-3xl font-bold ml-[10vw]">Our Products</h2>
      </div>
      <div className="flex flex-wrap">
        {topCategories.map((category) => (
          <Link
            href={`categories/${category.slug}`}
            className="w-1/4 p-2"
            key={category.id}
          >
            <div key={category.id}>
              <div className="bg-white rounded-lg shadow-lg">
                <div className="h-40 relative">
                  <Image
                    src={category?.resource?.url!}
                    layout="fill"
                    objectFit="cover"
                    alt={category.name}
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold">{category.name}</h4>
                  {/* <p className="text-sm text-gray-500">{category.description}</p> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products
