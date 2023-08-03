import logo from "./../assets/logo.png";
import { Link } from 'react-router-dom';
interface Item {
    path: string;
    name: string;
}
export const Navbar = ({ items }) => {
    console.log(items);
    
  return (
    <nav className="sticky top-0 p-4 border border-slate-300 shadow-md bg-white">
      <div className="flex justify-between items-center px-10 bg-white">
        
        <img src={logo} alt="Logo de la empresa" className="h-8" />
        <ul className="flex space-x-4">
        { items.map((item: Item, i: number) => {
            return <li key={i}>
                <Link to={item.path} className="text-slate-500 font-extrabold">{ item.name }</Link>
            </li>
        }) }
          {/* <li>
            <a href="#" className="text-slate-500 font-extrabold">
              Elemento 1
            </a>
          </li>
          <li>
            <a href="#" className="text-slate-500 font-extrabold">
              Elemento 2
            </a>
          </li>
          <li>
            <a href="#" className="text-slate-500 font-extrabold">
              Elemento 3
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
