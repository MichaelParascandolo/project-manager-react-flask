import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";

const Job = ({
  name,
  desc,
  start,
  end,
}: {
  name: string;
  desc: string;
  start: string;
  end: string;
}) => {
  const [completed, setCompleted] = useState<Boolean>(false);
  const [edit, setEdit] = useState<Boolean>(false);
  const [remove, setRemove] = useState<Boolean>(false);

  const styles = {
    notCompleted:
      "text-white mb-6 pb-4 bg-slate-700 mx-2 my-4 rounded-lg shadow-md shadow-slate-700",
    completed:
      "text-white mb-6 pb-4 bg-green-600 mx-2 my-4 rounded-lg shadow-md shadow-slate-700",
    button:
      "bg-blue-500 border-2 border-blue-800 text-lg p-2 rounded-full hover:bg-blue-700 transition-all ease-in-out duration-300 text-gray-200",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-500 p-2 my-2 bg-slate-700 text-white",
  };
  return (
    <>
      <div className={completed ? styles.completed : styles.notCompleted}>
        <div className="flex justify-center">
          <div className="text-center my-2">
            {/* <GoPerson /> */}
            <span className={completed ? "text-black" : "text-white"}>
              {name}
            </span>
            <p
              className={
                !completed
                  ? "text-gray-400 font-bold"
                  : "text-gray-700 font-bold"
              }
            >
              {desc}
            </p>
          </div>
        </div>
        <div
          className={
            !completed
              ? "px-4 mx-2 flex justify-between bg-slate-700 p-2 rounded-lg shadow-md"
              : "px-4 mx-2 flex justify-between bg-green-900 p-2 rounded-lg shadow-md line-through"
          }
        >
          <span className="text-gray-300">{start}</span>-
          <span className="text-gray-300">{end}</span>
        </div>
        <div className="flex px-2 mt-2 justify-evenly">
          {!completed ? (
            <button
              className={styles.button}
              onClick={() => {
                setEdit(!edit);
                setRemove(false);
              }}
            >
              <AiFillEdit size={20} />
            </button>
          ) : null}

          <button
            className={
              !completed
                ? styles.button
                : "bg-green-500 border-2 border-green-800 text-lg p-2 rounded-full hover:bg-green-700 transition-all ease-in-out duration-300 text-gray-200"
            }
            onClick={() => {
              setCompleted(!completed);
              setRemove(false);
              setEdit(false);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
          {!completed ? (
            <button
              className={styles.button}
              onClick={() => {
                setRemove(!remove);
                setEdit(false);
              }}
            >
              <AiFillDelete size={20} />
            </button>
          ) : null}
        </div>
        {/* edit menu start  */}
        <div
          className={
            edit
              ? "mt-4 px-2 opacity-1 transition-all h-[280px] ease-out duration-500"
              : "h-0 opacity-0"
          }
        >
          {edit ? (
            <>
              <input type="text" className={styles.input} value={name} />
              <input type="text" className={styles.input} value={desc} />
              <input type="text" className={styles.input} value={start} />
              <input type="text" className={styles.input} value={end} />
              <button
                className="bg-blue-500 border-2 border-blue-800 text-lg p-2 rounded-lg w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                onClick={() => setEdit(false)}
              >
                Save
              </button>
            </>
          ) : null}
        </div>
        {/* edit menu end */}
        {/* delete menu start */}
        <div
          className={
            remove
              ? "mt-4 px-2 opacity-1 transition-all h-[130px] ease-out duration-500"
              : "h-0 opacity-0"
          }
        >
          {remove ? (
            <>
              <p className={"text-center my-2"}>Are you sure?</p>
              <button className="bg-red-500 border-2 border-red-800 text-lg p-2 rounded-lg w-full hover:bg-red-700 transition-all ease-in-out duration-300">
                Delete
              </button>
              <button
                className="bg-blue-500 border-2 border-blue-800 text-lg p-2 rounded-lg w-full hover:bg-blue-700 transition-all ease-in-out duration-300 my-2"
                onClick={() => setRemove(false)}
              >
                Cancel
              </button>
            </>
          ) : null}
        </div>
        {/* delete menu end */}
      </div>
    </>
  );
};

export default Job;
