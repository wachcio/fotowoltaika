import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../store/storeProvider';
// import styles from './nav.module.scss';

function Nav() {
    const { routerLinks } = useContext(StoreContext);
    const menu = routerLinks.map((item) => (
        <li key={item.name} className="space-x-5 text-l px-2">
            <NavLink
                to={item.path}
                exact={item.exact ? item.exact : false}
                className=" text-white hover:text-yellow-400"
            >
                {item.name}
            </NavLink>
        </li>
    ));
    return (
        <>
            <header>
                <nav className="flex flex-row items-center justify-between p-6 h-20 shadow-sm">
                    {/* <div className="py-5 px-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-sm text-black font-semibold shadow-lg hover:cursor-pointer hover:shadow-lg">
                        PV
                    </div> */}
                    <ul className="flex flex-row">{menu}</ul>
                </nav>
            </header>
        </>
    );
}

export default Nav;
