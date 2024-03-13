import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="home">
        <h1 className="home-heading capitalize">
          unleash your creative vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20 ">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              href={link.route}
              key={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center bg-white p-4 w-fit rounded-full">
                <Image src={link.icon} alt="logo" width={24} height={24} />
              </li>
              <p className="text-center text-white p-14-medium">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          page={page}
          totalPages={images?.totalPage}
        />
      </section>
    </>
  );
};

export default Home;
