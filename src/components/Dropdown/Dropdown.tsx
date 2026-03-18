import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface DropdownProps {
  itemsModal: any[];
  items: any;
  descricaoModal: string[];
  onChange(): void;
}

function Dropdown({
  items,
  descricaoModal,
  onChange,
  itemsModal,
}: DropdownProps) {
  console.log(items);

  return (
    <>
      <div className="flex gap-5">
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
            {descricaoModal[0]}
          </MenuButton>
          <MenuItems
            transition
            className="absolute left-2 z-10 mt-2 max-w-2xl origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
          >
            <div className="py-1">
              {itemsModal.map((x) => (
                <MenuItem>
                  <a
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-sky-700"
                  >
                    {x}
                  </a>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
        {items.length > 0 ? (
          <div>
            <Menu as="div" className="relative inline-block">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                {descricaoModal[1]}
              </MenuButton>
              <MenuItems
                transition
                className="absolute left-2 z-10 mt-2 max-w-2xl origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
              >
                <div className="py-1">
                  {itemsModal.map((x) => (
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-2 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-sky-700"
                      >
                        {x}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        ) : (
          <div>sem itens</div>
        )}
      </div>
    </>
  );
}

export default Dropdown;
