import { Sequence } from "remotion";
import { HelloUserIntro } from "./HelloUserIntro";
import { useSession } from "../../../lib/Session";
import useUserBullets from "../../../hooks/useUserBullets";
import { CurrentWeekIntro } from "./CurrentWeekIntro";
import { NumberNotesContent } from "./NumberNotesContent";
import useProfileData from "../../../hooks/useProfileData";
import { ShowStreakContent } from "./ShowStreakContent"

type WeeklyDosageVideoProps = {
}

export const WeeklyDosageVideo: React.FC<WeeklyDosageVideoProps> = ({  }) => {
    const session = useSession();
    const pastWeekBullets = useUserBullets("PastWeek");
    const lifetimeBullets = useUserBullets("Personal");
    const profData = useProfileData();

    return (
        <div className="bg-white text-black h-full w-full">
            <>
                {/* Starts at 0 seconds, 3 seconds long */}
                <Sequence from={0} durationInFrames={3 * 30}>
                    <HelloUserIntro displayName={session?.user?.displayName}/>
                </Sequence>

                {/* Starts at 3 seconds, 5 seconds long */}
                <Sequence from={3 * 30} durationInFrames={5 * 30}>
                    <CurrentWeekIntro />
                </Sequence>

                {/* Starts at 8 seconds, 5 seconds long */}
                <Sequence from={8 * 30} durationInFrames={5 * 30}>
                    <NumberNotesContent pastWeekBullets={pastWeekBullets.bullets} lifetimeBullets={lifetimeBullets.bullets}/>
                </Sequence>
                {/* Starts at 13 seconds, 5 seconds long */}
                <Sequence from={13 * 30} durationInFrames={4 * 30}>
                    <ShowStreakContent streakCount={profData?.streaks.streakCount}/>
                </Sequence>


            </>
        </div>
    );
};

{/*

Outline

<intro>
hello person
this is your weekly dosage for current week

<content>
Number of notes past Week
Number of total notes



*/}


