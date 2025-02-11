import { COMPANYLOGOS } from "../../assets/data/companylogos";

export default function CompanyLogos() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center w-[95%] m-auto">
      {COMPANYLOGOS.map((item) => (
        <img key={item.id} src={item.logo} alt="Company Logos" />
      ))}
    </div>
  );
}
