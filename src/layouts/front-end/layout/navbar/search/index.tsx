import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {BeforeTimeIcon, MicIcon, SearchIcon} from "../../../../../assets/icons";
import {Combobox} from "@headlessui/react";

interface SearchItem {
  value: string;
  key: string;
}

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);

  const history = [
    {
      value: "Şampiyonlar ligi leverkusen",
      key: "hs-1",
    },
    {
      value: "Nest js",
      key: "hs-2",
    },
    {
      value: "Northgard",
      key: "hs-3",
    },
    {
      value: "Renklensin",
      key: "hs-4",
    },
    {
      value: "Renklensin Gecelerimiz",
      key: "hs-5",
    },
    {
      value: "React Typescript",
      key: "hs-6",
    },
    {
      value: "Node js",
      key: "hs-7",
    },
    {
      value: "Baturay Özdemir Standup",
      key: "hs-8",
    },
    {
      value: "Şampiyonlar ligi Dortmund",
      key: "hs-9",
    },
  ];

  const searchData = [
    ...history,
    {
      value: "hello",
      key: "sr-1",
    },
    {
      value: "hello-2",
      key: "sr-2",
    },
    {
      value: "hello-3",
      key: "sr-3",
    },
  ];

  const removeSearch = (key: string) => {
    const newItems = searchItems.map((sr) => {
      if (sr.key === key) {
        sr.value = "Öneri kaldırıldı";
        sr.key = "hs-0";
      }

      return sr;
    });

    setSearchItems(newItems);
  };

  useEffect(() => {
    if (searchValue !== "" && searchValue !== null) {
      const length = searchValue?.length;
      const newData = searchData.filter((sr) => sr.value.substring(0, length).toLowerCase() === searchValue.toLowerCase());

      setSearchItems(newData);
    } else setSearchItems([...history]);
  }, [searchValue]);

  return (
    <div className='w-full flex items-center justify-center gap-4'>
      <div className='w-full max-w-[640px] flex'>
        <Combobox
          value={searchValue}
          onChange={setSearchValue}
          nullable
        >
          {({open}) => (
            <>
              <div
                className={classNames("flex items-center w-full relative", {
                  "p-1.5 pl-4 border border-[#065fd4] rounded-l-full w-full": open === true,
                })}
              >
                <div className='pr-3'>
                  <div className='w-[20px] h-[20px]'>
                    {open && (
                      <SearchIcon
                        width={20}
                        height={20}
                        viewBox='0 0 24 24'
                      />
                    )}
                  </div>
                </div>

                <Combobox.Button
                  className={classNames("w-full", {
                    "py-1.5 pl-4 border border-dark-theme-soft-black rounded-l-full": !open,
                  })}
                >
                  <Combobox.Input
                    type='text'
                    ref={inputRef}
                    placeholder='Ara'
                    className='min-w-full border-none bg-transparent outline-none placeholder:text-[#888888] py-[1px]'
                    value={searchValue ?? ""}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Combobox.Button>

                {searchItems.length > 0 && (
                  <Combobox.Options className='absolute w-full top-[115%] left-0 bg-dark-theme-soft-black rounded-lg py-4'>
                    {(searchItems || []).map((sr, index) => (
                      <div
                        key={index}
                        className={classNames("flex items-center justify-between gap-2 pl-4 pr-6", {
                          "hover:bg-dark-theme-extra-soft-black": sr.key !== "hs-0",
                        })}
                      >
                        {sr.key !== "hs-0" ? (
                          <>
                            <Combobox.Option
                              value={sr.value}
                              className='flex-1'
                            >
                              <div className='flex items-center gap-[14px]'>
                                {sr.key.substring(0, sr.key.indexOf("-")) === "hs" ? (
                                  <BeforeTimeIcon
                                    width={20}
                                    height={20}
                                  />
                                ) : (
                                  <SearchIcon
                                    width={20}
                                    height={20}
                                  />
                                )}
                                <p className='leading-8'>
                                  <b>{sr.value}</b>
                                </p>
                              </div>
                            </Combobox.Option>
                            <button
                              onClick={() => {
                                inputRef.current && inputRef.current.focus();
                                removeSearch(sr.key);
                              }}
                            >
                              <span className='text-[13px] text-dark-theme-blue hover:underline'>Kaldır</span>
                            </button>
                          </>
                        ) : (
                          <span className='text-dark-theme-primary-black leading-8'>{sr.value}</span>
                        )}
                      </div>
                    ))}
                  </Combobox.Options>
                )}
              </div>

              <button
                type='button'
                className='bg-dark-theme-soft-black px-[6px] min-w-16 flex items-center justify-center rounded-r-full'
              >
                <SearchIcon />
              </button>
            </>
          )}
        </Combobox>
      </div>

      <button className='w-10 h-10 grid place-items-center rounded-full bg-dark-theme-soft-black transition-colors duration-200 hover:bg-[#303030]'>
        <MicIcon />
      </button>
    </div>
  );
};

export default Search;
