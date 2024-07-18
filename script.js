const box = document.getElementById("grid_box"); //this is the game container
const blocks_arr = document.getElementsByClassName("Oxgrid"); //class containg all the blocks
box.style.display = "none";
const retry_bttn_cnt = document.getElementById("retry_nd_sound");
retry_bttn_cnt.style.display = "none";
window.addEventListener("resize", grd_adjust);
var parag = document.getElementById("ani_text");
parag.innerText = "OXO XOX OXO";
let int;
let int_2;
let inint;
let inint_2;
let count = 0;
const final_str = "TIC TAC TOE";
const final_str_2 = "OXO XOX OXO";
let ana_int;
let ox_var = 0; //stores whether O is to be printed or X
const cutting_line = document.getElementById("cutting_line");
func();
let first_tic_tac_toe = setTimeout(funcout, 2500);
let outerInt = setInterval(parentInterval, 5000);
function parentInterval() {
  func();
  ana_int = setTimeout(funcout, 2500);
}
function func() {
  count = 0;
  clearInterval(int_2);
  clearInterval(inint_2);
  int = setInterval(randomizer, 100);
}
function funcout() {
  count = 0;
  clearInterval(int);
  clearInterval(inint);
  int_2 = setInterval(randomizer_2, 100);
}
function randomizer() {
  clearInterval(inint);
  inint = setInterval(rand_char, 25);
  count++;
}
function rand_char() {
  if (count == 4 || count == 8) count++;
  parag.innerText = final_str.substring(0, count);
  for (let i = 1; i <= 11 - count; i++) {
    let selector = Math.floor(Math.random() * 25);
    selector += 65;
    if (i == 4 - count || i == 8 - count) {
      parag.innerText = parag.innerText
        .concat(" ")
        .concat(String.fromCharCode(selector));
      i++;
    } else {
      parag.innerText = parag.innerText.concat(String.fromCharCode(selector));
    }
  }
}
function randomizer_2() {
  clearInterval(inint_2);
  inint_2 = setInterval(rand_char_2, 25);
  count++;
}
function rand_char_2() {
  parag.innerText = "";
  for (let i = 1; i <= 12 - count; i++) {
    let selector = Math.floor(Math.random() * 25);
    selector += 65;
    if (i == 5 - count || i == 9 - count) {
      parag.innerText = String.fromCharCode(selector)
        .concat(" ")
        .concat(parag.innerText);
      i++;
    } else {
      parag.innerText = String.fromCharCode(selector).concat(parag.innerText);
    }
  }
  if (count == 4 || count == 8) count++;
  parag.innerText = parag.innerText.concat(
    final_str_2.substring(11 - count + 1, 11)
  );
}
grd_adjust(); //Width of the whole grid
function grd_adjust() {
  let new_blk_width;
  if (window.innerWidth > window.innerHeight) {
    new_width = 0.6 * window.innerHeight;
    box.style.width = `${new_width}px`;
    for (let i = 0; i < blocks_arr.length; i++) {
      new_blk_width = (0.6 / 3) * window.innerHeight;
      blocks_arr[i].style.width = blocks_arr[
        i
      ].style.height = `${new_blk_width}px`;
    }
  } else {
    new_width = 0.6 * window.innerWidth;
    box.style.width = `${new_width}px`;
    for (let i = 0; i < blocks_arr.length; i++) {
      new_blk_width = (0.6 / 3) * window.innerWidth;
      blocks_arr[i].style.width = blocks_arr[
        i
      ].style.height = `${new_blk_width}px`;
    }
  }
  let all_alphas = document.getElementsByClassName("O_or_X");
  for (let i = 0; i < all_alphas.length; i++) {
    all_alphas[i].style.fontSize = `${new_blk_width * 0.7}px`;
  }
  cutting_line.style.width = `${new_blk_width * 2.8}px`;
  cutting_line.style.left = `${
    (window.innerWidth - new_width) / 2 + new_blk_width * 0.1
  }px`;
  document.getElementsByTagName("a")[0].style.bottom = "0px";
}
document.addEventListener("keypress", key_stop_ani);
function key_stop_ani(event) {
  if (event.key == " " || event.key === "Enter") {
    stop_ani();
    document.removeEventListener("keypress", key_stop_ani);
  }
}
document.addEventListener("click", stop_ani);
function stop_ani() {
  clearInterval(outerInt);
  clearTimeout(first_tic_tac_toe);
  clearInterval(int);
  clearInterval(inint);
  clearInterval(int_2);
  clearInterval(inint_2);
  clearTimeout(ana_int);
  let i = 0;
  parag.innerText = "TIC TAC TOE";
  let oxo_txt = setInterval(() => {
    if (i <= 11) {
      parag.innerText = parag.innerText.substring(0, 11 - i);
      if (i == 3 || i == 7)
        parag.innerText = parag.innerText
          .concat(" ")
          .concat(final_str_2.substring(11 - i, 11));
      else
        parag.innerText = parag.innerText.concat(
          final_str_2.substring(11 - i, 11)
        );
      i++;
    }
  }, 25);
  parag.classList.add("removal");
  let inst_ng = document.getElementsByClassName("instruct_ng")[0];
  inst_ng.classList.remove("instruct_ng");
  inst_ng.classList.add("click_css");
  retry_bttn_cnt.classList.add("retry_nd_sound_ani");
  document.removeEventListener("click", stop_ani);
  setTimeout(() => {
    document.body.removeChild(parag);
    document.body.removeChild(inst_ng);
    box.style.display = "grid";
    retry_bttn_cnt.style.display = "flex";
    grd_adjust();
    box.classList.add("grd_intro");
    for (let i = 0; i < 9; i++) {
      blocks_arr[i].addEventListener("click", box_filling);
    }
    document.getElementsByTagName("a")[0].style.display = "block";
    document.getElementsByTagName("header")[0].style.display ="flex";
    document.getElementsByTagName("header")[0].classList.add("grd_intro");
  }, 2300);
  document.getElementById("retry_bttn").addEventListener("click", new_game);
}
let winner = 0;
let filled_box = 0;
let zero_pos = []; //To store the positions of zeros
let cross_pos = []; //To store the positions of crosses
function box_filling(event) {
  //To fill the boxes
  let O_X = document.createElement("p");
  if (ox_var == 0) {
    O_X.classList.add("zero");
    O_X.innerText = "O";
    ox_var = 1;
    filled_box++;
    for (let i = 0; i < 9; i++) {
      if (event.target == document.getElementsByClassName("Oxgrid")[i])
        zero_pos.push(i);
    }
    document.getElementById("circle_sound").currentTime = 0;
    document.getElementById("circle_sound").play();
  } else {
    O_X.classList.add("cross");
    O_X.innerText = "X";
    ox_var = 0;
    filled_box++;
    for (let i = 0; i < 9; i++) {
      if (event.target == document.getElementsByClassName("Oxgrid")[i])
        cross_pos.push(i);
    }
    document.getElementById("cross_sound").currentTime = 0;
    document.getElementById("cross_sound").play();
  }
  O_X.style.fontSize = `${
    0.7 *
    blocks_arr[0].style.width.substring(0, blocks_arr[0].style.width.length - 2)
  }px`;
  document.getElementsByTagName(
    "style"
  )[0].innerHTML += `@keyframes char_appearence{
        0%{
            font-size:0px;
        }
        80%
        {
            font-size:${
              1.25 *
              (0.7 *
                blocks_arr[0].style.width.substring(
                  0,
                  blocks_arr[0].style.width.length - 2
                ))
            }px;
        }
        100%
        {
            font-size:${
              0.7 *
              blocks_arr[0].style.width.substring(
                0,
                blocks_arr[0].style.width.length - 2
              )
            }px;
        }
    }`;
  O_X.classList.add("O_or_X");
  event.target.appendChild(O_X);
  event.target.removeEventListener("click", box_filling); //Removing event listener from the box which has been immediately filled
  //Cheking whether the game is over or not
  if (filled_box >= 5) {
    checking_func(zero_pos);
    if (winner == 0) checking_func(cross_pos);
  }
  cursor_change(event);
}
let line_handler_function;
function checking_func(pos_arr) {
  if (pos_arr.indexOf(0) != -1) {
    if (pos_arr.indexOf(1) != -1 && pos_arr.indexOf(2) != -1) {
      winner = 1;
      cutting_line.style.top = `${
        100 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) /
          2
      }px`;
      window.addEventListener("resize", linehorGenerator(0));
      line_handler_function = linehorGenerator(0);
    } else if (pos_arr.indexOf(3) != -1 && pos_arr.indexOf(6) != -1) {
      winner = 1;
      cutting_line.style.transform = "rotate(90deg)";
      cutting_line.style.transformOrigin = "left";
      cutting_line.style.top = `${
        100 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) *
          0.1
      }px`;
      cutting_line.style.left = `${
        (window.innerWidth -
          box.style.width.substring(0, box.style.width.length - 2)) /
          2 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) /
          2 -
        4
      }px`;
      window.addEventListener("resize", linever_1);
      line_handler_function = linever_1;
    } else if (pos_arr.indexOf(4) != -1 && pos_arr.indexOf(8) != -1) {
      winner = 1;
      cutting_line.style.transformOrigin = "left";
      cutting_line.style.transform = "rotate(45deg)";
      cutting_line.style.top = `${
        100 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) *
          0.25
      }px`;
      cutting_line.style.left = `${
        (window.innerWidth -
          box.style.width.substring(0, box.style.width.length - 2)) /
          2 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) /
          4
      }px`;
      cutting_line.style.width = `${
        cutting_line.style.width.substring(
          0,
          cutting_line.style.width.length - 2
        ) * 1.3
      }px`;
      cutting_line.style.height = "4px";
      window.addEventListener("resize", lineslant_1);
      line_handler_function = lineslant_1;
    }
  }
  if (pos_arr.indexOf(1) != -1 && winner != 1) {
    if (pos_arr.indexOf(4) != -1 && pos_arr.indexOf(7) != -1) {
      winner = 1;
      cutting_line.style.transform = "rotate(90deg)";
      cutting_line.style.transformOrigin = "left";
      cutting_line.style.top = `${
        100 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) *
          0.1
      }px`;
      cutting_line.style.left = `${
        (window.innerWidth -
          box.style.width.substring(0, box.style.width.length - 2)) /
          2 +
        (3 *
          blocks_arr[0].style.width.substring(
            0,
            blocks_arr[0].style.width.length - 2
          )) /
          2
      }px`;
      window.addEventListener("resize", linever_2);
      line_handler_function = linever_2;
    }
  }
  if (pos_arr.indexOf(2) != -1 && winner != 1) {
    if (pos_arr.indexOf(4) != -1 && pos_arr.indexOf(6) != -1) {
      winner = 1;
      cutting_line.style.transformOrigin = "left";
      cutting_line.style.transform = "rotate(135deg)";
      cutting_line.style.top = `${
        100 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) *
          0.25
      }px`;
      cutting_line.style.left = `${
        (window.innerWidth -
          box.style.width.substring(0, box.style.width.length - 2)) /
          2 +
        (11 *
          blocks_arr[0].style.width.substring(
            0,
            blocks_arr[0].style.width.length - 2
          )) /
          4
      }px`;
      cutting_line.style.width = `${
        cutting_line.style.width.substring(
          0,
          cutting_line.style.width.length - 2
        ) * 1.3
      }px`;
      cutting_line.style.height = "4px";
      window.addEventListener("resize", lineslant_2);
      line_handler_function = lineslant_2;
    } else if (pos_arr.indexOf(5) != -1 && pos_arr.indexOf(8) != -1) {
      winner = 1;
      cutting_line.style.transform = "rotate(90deg)";
      cutting_line.style.transformOrigin = "left";
      cutting_line.style.top = `${
        100 +
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) *
          0.1
      }px`;
      cutting_line.style.left = `${
        (window.innerWidth +
          8 -
          box.style.width.substring(0, box.style.width.length - 2)) /
          2 +
        (5 *
          blocks_arr[0].style.width.substring(
            0,
            blocks_arr[0].style.width.length - 2
          )) /
          2
      }px`;
      window.addEventListener("resize", linever_3);
      line_handler_function = linever_3;
    }
  }
  if (pos_arr.indexOf(3) != -1 && winner != 1) {
    if (pos_arr.indexOf(4) != -1 && pos_arr.indexOf(5) != -1) {
      winner = 1;
      cutting_line.style.top = `${
        104 +
        (3 *
          blocks_arr[0].style.width.substring(
            0,
            blocks_arr[0].style.width.length - 2
          )) /
          2
      }px`;
      window.addEventListener("resize", linehorGenerator(1));
      line_handler_function = linehorGenerator(1);
    }
  }
  if (pos_arr.indexOf(6) != -1 && winner != 1) {
    if (pos_arr.indexOf(7) != -1 && pos_arr.indexOf(8) != -1) {
      winner = 1;
      cutting_line.style.top = `${
        108 +
        (5 *
          blocks_arr[0].style.width.substring(
            0,
            blocks_arr[0].style.width.length - 2
          )) /
          2
      }px`;
      window.addEventListener("resize", linehorGenerator(2));
      line_handler_function = linehorGenerator(3);
    }
  }
  if (winner == 1) {
    let result = document.createElement("p");
    let winner_alphabet = blocks_arr[pos_arr[0]].innerText;
    result.innerText = ` ${winner_alphabet} has won 🥳`; //here we check the block[block_arr] which has the first occurence[pos_arr[0]] of winner and see whether O has won or X has won
    result.setAttribute("id", "result");
    if (winner_alphabet == "O") {
        document.querySelector("#score_disp div:nth-child(1) p:nth-child(2)").innerText = Number(document.querySelector("#score_disp div:nth-child(1) p:nth-child(2)").innerText)+1;//Updates the number of wins of 0 in the score_disp
        result.style.color = cutting_line.style.backgroundColor = "blue";
    } 
    else if (blocks_arr[pos_arr[0]].innerText == "X") {
        document.querySelector("#score_disp div:nth-child(3) p:nth-child(2)").innerText = Number(document.querySelector("#score_disp div:nth-child(3) p:nth-child(2)").innerText)+1;//Updates the number of wins of X in the score_disp
        result.style.color = cutting_line.style.backgroundColor = "red";
    }
    document.getElementById("result_div").appendChild(result);
    for (let i = 0; i < 9; i++)
      blocks_arr[i].removeEventListener("click", box_filling);
    cutting_line.style.visibility = "visible";

    document.getElementsByTagName("a")[0].style.bottom = "0px";
    attribution_pos();
    cutting_line_ani();
    result.classList.add("result_cls");
  } 
  else if (filled_box == 9) {
    let result = document.createElement("p");
    result.innerText = "Draw 🤝";
    document.querySelector("#score_disp div:nth-child(2) p:nth-child(2)").innerText = Number(document.querySelector("#score_disp div:nth-child(2) p:nth-child(2)").innerText)+1;//Updates the number of draws in the score_disp
    result.setAttribute("id", "result");
    result.style.color = "rgb(50,50,50)";
    document.getElementById("result_div").appendChild(result);
    winner = 2; //This is to prevent checking_func to run for cross when it is a draw. This is done only for when O wins in the last turn
    document.getElementsByTagName("a")[0].style.bottom = "0px";
    attribution_pos();
    result.classList.add("result_cls");
  }
}
//functions linehor, linever and lineslant keep in  place the position of the cutting line when the screen is resized

function linehorGenerator(rowIndex)
{
  return function()
  {
    {
      cutting_line.style.top = `${
        100 +rowIndex*4+(2*rowIndex+1)*
        blocks_arr[0].style.width.substring(
          0,
          blocks_arr[0].style.width.length - 2
        ) /
          2
      }px`;
    }
  }
}
function lineverTop()
{
  cutting_line.style.top = `${
    100 +
    blocks_arr[0].style.width.substring(
      0,
      blocks_arr[0].style.width.length - 2
    ) *
      0.1
  }px`;
}
function linever_1() {
  lineverTop();
  cutting_line.style.left = `${
    (window.innerWidth -
      box.style.width.substring(0, box.style.width.length - 2)) /
      2 +
    blocks_arr[0].style.width.substring(
      0,
      blocks_arr[0].style.width.length - 2
    ) /
      2 -
    4
  }px`;
}
function linever_2() {
  lineverTop();
  cutting_line.style.left = `${
    (window.innerWidth -
      box.style.width.substring(0, box.style.width.length - 2)) /
      2 +
    blocks_arr[0].style.width.substring(
      0,
      blocks_arr[0].style.width.length - 2
    ) *
      1.5
  }px`;
}
function linever_3() {
  lineverTop();
  cutting_line.style.left = `${
    (window.innerWidth +
      8 -
      box.style.width.substring(0, box.style.width.length - 2)) /
      2 +
    blocks_arr[0].style.width.substring(
      0,
      blocks_arr[0].style.width.length - 2
    ) *
      2.5
  }px`;
}
function lineslantTopAndWidth(){
  cutting_line.style.top = `${
    100 +
    blocks_arr[0].style.width.substring(
      0,
      blocks_arr[0].style.width.length - 2
    ) *
      0.25
  }px`;
  cutting_line.style.width = `${
    cutting_line.style.width.substring(0, cutting_line.style.width.length - 2) *
    1.3
  }px`;
}
function lineslant_1() {
  lineslantTopAndWidth();
  cutting_line.style.left = `${
    (window.innerWidth -
      box.style.width.substring(0, box.style.width.length - 2)) /
      2 +
    blocks_arr[0].style.width.substring(
      0,
      blocks_arr[0].style.width.length - 2
    ) /
      4
  }px`;
}
function lineslant_2() {
  lineslantTopAndWidth();
  cutting_line.style.left = `${
    (window.innerWidth -
      box.style.width.substring(0, box.style.width.length - 2)) /
      2 +
    (11 *
      blocks_arr[0].style.width.substring(
        0,
        blocks_arr[0].style.width.length - 2
      )) /
      4
  }px`;
}
function cutting_line_ani() {
  let style_for_ani = document.getElementsByTagName("style")[0];
  style_for_ani.innerHTML += `@keyframes cutting_ani{
        from{
            width:0px;
        }
        to
        {
            width:${cutting_line.style.width};
        }`;
  document.head.appendChild(style_for_ani);
  cutting_line.classList.add("cutting_ani_cls");
}
function new_game() {
  let all_alphas = document.getElementsByClassName("O_or_X");
  let alpha_amt = all_alphas.length;
  for (let i = 0; i < alpha_amt; i++) {
    all_alphas[0].remove();
  }
  cutting_line.style.visibility = "hidden";
  if (document.getElementById("result"))
    document.getElementById("result").remove();
  winner = 0;
  for (let i = 0; i < 9; i++) {
    blocks_arr[i].addEventListener("click", box_filling);
  }
  zero_pos = [];
  cross_pos = [];
  ox_var = 0;
  filled_box = 0;
  cutting_line.style.transform = "rotate(0deg)";
  cutting_line.classList.remove("cutting_ani_cls");
  grd_adjust();
  window.removeEventListener("resize", line_handler_function);
  attribution_pos();
}
document.getElementById("sound_bttn").addEventListener("click", sound_on_off);
let sound_var = true;
let mute_bttn = document.getElementById("mute_bttn");
mute_bttn.style.display = "none";
mute_bttn.addEventListener("click", sound_on_off);
function sound_on_off() {
  if (sound_var) {
    document.getElementById("cross_sound").muted = true;
    document.getElementById("circle_sound").muted = true;
    mute_bttn.style.display = "block";
    mute_bttn.style.zIndex = "2";
    document.getElementById("sound_bttn").style.display = "none";
    document.getElementById("sound_bttn").style.zIndex = "1";
  } else {
    document.getElementById("cross_sound").muted = false;
    document.getElementById("circle_sound").muted = false;
    mute_bttn.style.display = "none";
    document.getElementById("sound_bttn").style.display = "block";
    document.getElementById("sound_bttn").style.zIndex = "2";
    mute_bttn.style.zIndex = "1";
  }
  sound_var = !sound_var;
}
const attri = document.getElementsByTagName("a")[0];
attribution_pos();
function attribution_pos() {
  if (
    100 +
      new_width +
      document.getElementById("result_div").scrollHeight +
      0.05 * window.innerHeight +
      20 >
    window.innerHeight
  )
    attri.style.top = `${
      100 +
      new_width +
      document.getElementById("result_div").scrollHeight +
      0.05 * window.innerHeight +
      20
    }px`;
  else {
    attri.style.top = `${window.innerHeight - 15}px`;
  }
}
attribution_pos;
window.addEventListener("resize", attribution_pos);
box.addEventListener("mousemove", cursor_change);
box.addEventListener("mouseout", cursor_normal);
function cursor_change(event) {
  if (window.innerWidth > 800) {
    let cursor_char = document.getElementById("cursor_char");
    if (
      winner == 0 &&
      document.documentElement.clientHeight ==
        document.documentElement.scrollHeight
    ) {
      box.style.cursor = "none";
      cursor_char.style.visibility = "visible";
      cursor_char.style.fontSize = `${box.clientHeight / 10}px`;
      if (ox_var == 0) {
        cursor_char.innerText = "O";
        cursor_char.style.color = "blue";
      } else {
        cursor_char.innerText = "X";
        cursor_char.style.color = "red";
      }
      cursor_char.style.top = `${event.clientY - box.clientHeight / 20}px`;
      cursor_char.style.left = `${event.clientX - box.clientHeight / 35}px`;
      cursor_char.style.zIndex = -1;
    } else {
      box.style.cursor = "default";
      cursor_char.style.visibility = "hidden";
    }
  }
}
function cursor_normal() {
  document.getElementById("cursor_char").style.visibility = "hidden";
  box.style.cursor = "default";
}