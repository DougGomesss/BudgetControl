import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface DropdownProps {
  items: [];
}

function Dropdown({ items }: DropdownProps) {
  return (
    <>
      {items.map((x) => console.log(x))}
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
          Tipo
        </MenuButton>
        <MenuItems
          transition
          className="absolute z-10 mt-2 max-w-2xl origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-2 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-sky-700"
              >
                Despesa
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-sky-700"
              >
                Receita
                <div></div>
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default Dropdown;
