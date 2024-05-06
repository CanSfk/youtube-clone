import {SuggestionbarItem} from "./suggestionbar-item";

export const Suggestionbar = () => {
  return (
    <div className='px-6 h-14 grid place-items-center fixed bg-dark-theme-black'>
      <div className='flex items-center gap-3'>
        <SuggestionbarItem title='Tümü' />
        <SuggestionbarItem title='Oyun' />
        <SuggestionbarItem title='Müzik' />
        <SuggestionbarItem title="Mix'ler" />
        <SuggestionbarItem title='Canlı' />
        <SuggestionbarItem title='Aksiyon-macera oyunları' />
        <SuggestionbarItem title='Futbol' />
      </div>
    </div>
  );
};

export default Suggestionbar;
