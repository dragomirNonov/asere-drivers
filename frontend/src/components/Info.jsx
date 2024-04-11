import InfoCard from "./InfoCard";
import contract from "../assets/contract.png";
import schedule from "../assets/schedule.png";
import dictionary from "../assets/dictionary.png";
import workschedule from "../assets/workschedule.png";

const Info = () => {
  return (
    <div className="flex justify-center bg-cyan-900 p-6">
      <div className="flex">
        <InfoCard
          img={contract}
          title="FMCSA Certified"
          description=" Ensuring compliance with Federal Motor Carrier Safety Administration standards, guaranteeing safety and reliability."
        />
        <InfoCard
          img={schedule}
          title="Priority Scheduling"
          description=" Offering expedited scheduling services to prioritize your needs and ensure efficient planning."
        />
        <InfoCard
          img={dictionary}
          title="Bilingual Instructors"
          description="Providing instructors fluent in multiple languages for enhanced accessibility and understanding."
        />
        <InfoCard
          img={workschedule}
          title="Flexible Hours"
          description="Offering adaptable scheduling options to accommodate diverse schedules and preferences."
          isLast
        />
      </div>
    </div>
  );
};

export default Info;
