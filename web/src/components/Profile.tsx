import { Card } from './Card';
import { UniversityCard } from './UniversityCard';

export const Profile = () => {
  return (
    <div className='mx-4 lg:flex mt-10 max-w-5xl lg:mx-auto'>
      <section className='mb-4 lg:w-full'>
        <h2 className='text-sky-500 font-bold text-3xl mb-4'>My favorites</h2>
        <div className='mx-4 flex flex-col gap-3 overflow-y-auto max-h-[25vh] lg:max-h-[80vh]'>
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
          <UniversityCard
            title='University name'
            country='Country'
            description='We like to see a proposal'
          />
        </div>
      </section>
      <section className='mb-4 lg:w-full'>
        <h2 className='text-sky-500 font-bold text-3xl mb-4'>
          Selected university
        </h2>
        <Card element='article' className='flex flex-col gap-4'>
          <h3 className='text-black font-bold mb-4'>University name</h3>
          <p className='mb-2'>
            Laborum voluptate duis sit fugiat. Voluptate minim ullamco nisi
            proident et laborum qui aute qui. Ut Lorem ipsum veniam commodo
            ullamco occaecat aliquip velit ipsum velit.
          </p>
          <p>
            Sit laborum laboris ea non elit ea et minim consequat. Laboris culpa
            ut minim id quis exercitation sint amet exercitation cillum proident
            tempor. Ea id consequat dolor laborum nulla veniam id deserunt
            cillum id ea cillum.
          </p>
          <p>
            Website: <a href='#'>website.com</a>
          </p>
          <p>
            Location: <a href='#'>Country,City</a>
          </p>
          <p>
            Country's capital: <a href='#'>Country,City</a>
          </p>
          <p>Currency: Name (symbol)</p>
          <p>Language: Name</p>
          <p>Population: 999999</p>
        </Card>
      </section>
    </div>
  );
};
