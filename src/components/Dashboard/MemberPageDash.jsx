import React from "react";
import { Box, Toolbar} from '@mui/material';

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
    name: "Tania Andrew",
    desc: "dsfddsfdsfdsfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdgdgfdhfdhfgh",
    desig: "Senior Software Dev",
    dt: "17/05/0225 5:00:02",
    mode: "Android",
    num: 45,
  },
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
    name: "Tania Andrew",
    desc: "dsfddsfdsfdsfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdgdgfdhfdhfgh",
    desig: "Senior Software Dev",
    dt: "17/05/0225 5:00:02",
    mode: "Android",
    num: 45,
  },
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
    name: "Tania Andrew",
    desc: "dsfddsfdsfdsfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdgdgfdhfdhfgh",
    desig: "Senior Software Dev",
    dt: "17/05/0225 5:00:02",
    mode: "Android",
    num: 45,
  },
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
    name: "Tania Andrew",
    desc: "dsfddsfdsfdsfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdgdgfdhfdhfgh",
    desig: "Senior Software Dev",
    dt: "17/05/0225 5:00:02",
    mode: "Android",
    num: 45,
  },
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
    name: "Tania Andrew",
    desc: "dsfddsfdsfdsfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdgdgfdhfdhfgh",
    desig: "Senior Software Dev",
    dt: "17/05/0225 5:00:02",
    mode: "Android",
    num: 45,
  },
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
    name: "Tania Andrew",
    desc: "dsfddsfdsfdsfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdgdgfdhfdhfgh",
    desig: "Senior Software Dev",
    dt: "17/05/0225 5:00:02",
    mode: "Android",
    num: 45,
  },
];

function MemberPageDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
  return (
    // <div className="flex flex-col min-h-screen">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s, width 0.3s",
          width: {
            xs: "100%",
            md: desktopOpen
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - ${collapsedDrawerWidth}px)`,
          },
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        <div className="flex-grow">
          <hr className="mt-2" />
          <div className="flex items-center justify-between px-4 py-2 flex-wrap">
            <h1 className="text-xl w-full md:w-auto" style={{color:'#003566', fontWeight:"700"}}>OU for POC</h1>
            <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
              <select
                id="member-name"
                name="member-name"
                className="px-4 p-1 border text-sm font-semibold border-gray-300 rounded focus:outline-none w-full sm:w-auto"
              >
                <option value="" disabled selected>
                  Select a Member
                </option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Robert Brown</option>
              </select>
              <div className="p-x py-1 rounded w-full sm:w-auto">
                <input
                  type="text"
                  className="border w-full py-1 pl-2 rounded focus:outline-none"
                />
              </div>

              <button className="border px-3 py-1 cursor-pointer rounded bg-blue-950 text-white text-sm font-semibold">
                Filter
              </button>
            </div>
          </div>

          <div className="flex gap-1 items-center justify-end px-4 flex-wrap">
            <button className="border px-3 py-1 cursor-pointer rounded bg-blue-950 text-white text-sm font-semibold mb-2 md:mb-0">
              Employee
            </button>
            <button className="border px-3 py-1 cursor-pointer rounded bg-blue-950 text-white text-sm font-semibold mb-2 md:mb-0">
              Message Count
            </button>
          </div>

          <div className="p-4 flex gap-2 justify-center flex-wrap">
            {cards.map((item, idx) => (
              <div
                className="flex w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6"
                key={idx}
              >
                <div className="flex items-center gap-4 text-slate-800">
                  <img
                    src={item.image}
                    alt="Tania Andrew"
                    className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
                  />
                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <h5 className="text-xl font-semibold text-slate-800">
                        {item.name}
                        <br />
                        <span className="text-sm">{item.mode}</span>
                        <br />
                        <span className="text-sm">{item.dt}</span>
                      </h5>
                      <div className="flex flex-col text-right">
                        <p className="text-xl">{item.desig}</p>
                        <p className="text-xl">{item.num}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    // </div>
  );
}

export default MemberPageDash;
