interface FooterLinkProps {
  title: string;
  href?: string;
}

export const FooterLink: React.FC<FooterLinkProps> = ({title, href = "#"}) => {
  return (
    <a
      href={href}
      className='text-[13px] text-[#AAAAAA] leading-[1.12rem]'
    >
      {title}
    </a>
  );
};
