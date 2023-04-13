import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
// import "../../styles/interes";

function ChooseInterest() {
  const [selectedInterest, setSelectedInterest] = useState([]);
  // const [formInterest, setFormInterest] = useState({ interests: [] });
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const interestArray = [
    "Sports",
    "Wildlife",
    "Road Trip",
    "Book Club",
    "Games",
    "Adventure",
  ];

  const onClickNext = async () => {
    try {
      const response = await fetch("/api/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interests: [...selectedInterest] }),
      });
      if (response.status === 200) {
        // Interests updated successfully
        // Navigate to dashboard
        router.push("/");
      } else {
        // Failed to update interests
        // Show error message
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleInterest = (interest) => {
    if (selectedInterest.includes(interest)) {
      setSelectedInterest(selectedInterest.filter((item) => item !== interest));
    } else {
      setSelectedInterest([...selectedInterest, interest]);
      // setFormInterest({ interests: [...selectedInterest, interest] });
    }
  };

  const disabledNextBtn = selectedInterest.length < 2;

  return (
    <>
      <div className="interest-container">
        {interestArray.map((interest, index) => {
          return (
            <button
              key={index}
              className={`interest ${
                selectedInterest.includes(interest) ? "highlight" : ""
              }`}
              value={interest}
              onClick={() => handleInterest(interest)}
            >
              {interest}
            </button>
          );
        })}
      </div>
      <div className="next-btn">
        <Link href="/">
          <button
            onClick={onClickNext}
            disabled={disabledNextBtn}
            className={`interest-next-btn ${disabledNextBtn ? "disabled" : ""}`}
          >
            Next
          </button>
        </Link>
      </div>
    </>
  );
}

export default ChooseInterest;
