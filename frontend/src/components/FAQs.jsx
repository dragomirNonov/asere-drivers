import Question from "./Question";
import Accordion from "./accordion";

const FAQs = () => {
  return (
    <div className="bg-cyan-900 flex  flex-col justify-center pt-8" id="faq">
      <h2
        className="text-yellow-500 text-5xl flex justify-center  pb-4"
        style={{
          borderBottom: "1px solid",
          borderImage:
            "linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1",
        }}
      >
        FAQs:
      </h2>
      <div className="accordion  ">
        <div className=" p-40 pt-16">
          <Accordion
            title="What would be the first step in getting my CDL?"
            answer="A. First would be signing up with a credited FMSCA certified school. The school should show up on the FMSCA training provider registry link. There's thousands of schools find the one that best suits your needs."
          />
          <Accordion
            title="What does the cost of tuition cover?"
            answer="A: The cost of tuition is $4,000. It covers the study material you receive when you make the down payment of $500. The study material is a 100% pass at the DPS. The rest of the tuition goes to the guaranteed Monday through Saturday practice hours. You pay a flat fee to drive everyday, at least 1 hour daily, 6 days a week. Also covers the ELDT course you have to take in order to obtain your CDL license. Lastly, included in the cost, is the first rental of the truck to the DPS. Any time after is a separate rental fee."
          />
          <Accordion
            title="What is this new ELDT course I have to take?"
            answer="ELDT stands for ENTRY- LEVEL- DRIVER- TRAINING. Its an online course you take towards the end of your required hours of training. We send you a direct link. You can take the course from the comfort of your home, but it is lengthy, 8 hours roughly. Its a series of videos, reading material, and pop quizzes of the material you have seen through the course. At the end it generates a certificate. With that certificate you are able to go take your driving exam at the DPS."
          />
          <Accordion
            title="I want to get started with ASERE Drivers. What documents do I need?"
            answer="A. The sign up process is in person. We only require a valid Texas Driver's License. You sign some documents and we only require a initial fee of $500 which goes towards your tuition. From there we give you the study material to take home and memorize."
          />
          <Accordion
            title="I've studied all the material do I go to the office to take my test?"
            answer="A. The DPS Is the only entity that can give you the CLP (commercial learner's permit) and the CDL (commercial drivers license) we are not a third party testing facility. In the study folder we give you we also provide all the necessary documents you need to take the DPS to take the exams to obtain your CLP. But you need to go to the DPS after you've studied and take your exams there."
          />
          <Accordion
            title="What is DOT Medical Card/ Exam and when do I need to have this done?"
            answer="A: DEPARTMENT OF TRANSPORT medical card/medical exam. You can go to any clinic you choose. Certain GA's can administer a DOT medical exam. Most exams are like a general check up. They take your blood pressure, check your eyesight, and take a urine exam to check for any unprescribed drugs example: cannabis or opioids. At the end of the exam if all is right you will receive a DOT med card. This card insures you are medically capable to drive a commercial truck. You need to have this exam done before you go to the DPS to take your theory tests in order to get your CLP. The DOT med card should be valid for 2 years. In some cases it is only valid for a certain amount of time. Depends on your health and the discretion of the physician."
          />
          <Accordion
            title="Is there any outside costs not included in the tuition?"
            answer="A. Yes. You pay the DPS $25 to take the four exams you need to obtain your CLP. If you fail any of your four exams more than 3 times you have to repay the DPS $25 again until you pass. You also pay a fee to any outside clinic that administers your DOT Medical Exam. The cost ranges from $60~90. Also be aware, If you don't pass your driving test at the DPS the first time, and you choose to rent the truck from us, it's $200 any other time after the first. Lastly you must pay the DPS to take your road-test/driving exam. The cost is according to the digits of your drivers license. Ranges from $60~95. The DPS imposes these cost we have no control over the amount."
          />
        </div>
      </div>
    </div>
  );
};

export default FAQs;
