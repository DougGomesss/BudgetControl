import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";

interface DropdownProps {
  descricaoDropdown: string;
  children: ReactNode;
  isDisabled: boolean;
}

function Dropdown({ descricaoDropdown, children, isDisabled }: DropdownProps) {
  return (
    <div className="flex gap-5">
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
          {descricaoDropdown}
        </MenuButton>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-max min-w-full origin-top-left rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="">
            {isDisabled ? (
              <>
                <MenuItem disabled={true}>
                  <div className=" hidden">{children}</div>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <div className="px-4 py-2 flex flex-col gap-1">
                    {children}
                  </div>
                </MenuItem>
              </>
            )}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default Dropdown;
