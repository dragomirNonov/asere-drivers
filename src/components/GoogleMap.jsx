import React from "react";

const GoogleMap = () => {
  return (
    <div className="map p-4 ">
      <iframe
        className="googlemap"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.7845017683335!2d-95.436683!3d30.071710999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647354dc21686b3%3A0xdeee3cab600f8af7!2sAsere%20Drivers%20CDL!5e0!3m2!1sen!2sus!4v1712882092995!5m2!1sen!2sus"
        width="100%"
        height="550"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
