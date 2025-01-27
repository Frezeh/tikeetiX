import { setHours, setMinutes } from "date-fns";

type Props = {
  timeValue: string;
  setTimeValue: (time: string) => void;
  selected: Date | undefined;
  setSelected: (date: Date | undefined) => void;
};

export default function TimePicker({
  timeValue,
  setTimeValue,
  selected,
  setSelected,
}: Props) {
  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  return (
    <form style={{ marginLeft: 25 }}>
      <label>
        Set the time:{" "}
        <input type="time" value={timeValue} onChange={handleTimeChange} />
      </label>
    </form>
  );
}
