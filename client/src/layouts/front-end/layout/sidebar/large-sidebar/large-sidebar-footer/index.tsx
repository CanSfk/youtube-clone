import {FooterLink} from "./footer-link";

export const LargeSidebarFooter = () => {
  return (
    <div>
      <div className='flex gap-x-2 flex-wrap pt-4 px-6'>
        <FooterLink title='Hakkında' />
        <FooterLink title='Basın' />
        <FooterLink title='Telif hakkı' />
        <FooterLink title='Bize ulaşın' />
        <FooterLink title='İçerik Üreticiler' />
        <FooterLink title='Reklam verme' />
        <FooterLink title='Geliştiriciler' />
      </div>

      <div className='flex gap-x-2 flex-wrap pt-3 px-6'>
        <FooterLink title='Şartlar' />
        <FooterLink title='Gizlilik' />
        <FooterLink title='Politika ve Güvenlik' />
        <FooterLink title='YouTube Nasıl Çalışıyor?' />
        <FooterLink title='Yeni özellikleri deneyin' />
      </div>

      <div className='pt-4 pb-4 px-6'>
        <span className='text-[12px] text-[#717171]'>© 2024 Code Neon</span>
      </div>
    </div>
  );
};

export default LargeSidebarFooter;
