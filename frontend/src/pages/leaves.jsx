import React, { Component } from "react";

import "./css/leaves.css";

/**
 * @typedef Leave
 * @prop {string} leave_id
 * @prop {Array<string>} dates
 * @prop {string} status
 */

class Leaves extends Component {
	state = {
		/**
		 * @type {Leave[]}
		 */
		leaves: [
			{
				leave_id: "leave_1",
				dates: ["2023-10-01", "2023-10-02", "2023-10-03"],
				status: "Approved",
			},
			{
				leave_id: "leave_2",
				dates: ["2023-10-04", "2023-10-05", "2023-10-06"],
				status: "Approved",
			},
			{
				leave_id: "leave_3",
				dates: ["2023-10-07", "2023-10-08"],
				status: "Approved",
			},
			{
				leave_id: "leave_4",
				dates: ["2023-10-09", "2023-10-10", "2023-10-11"],
				status: "Pending",
			},
			{
				leave_id: "leave_5",
				dates: ["2023-10-12", "2023-10-13"],
				status: "Approved",
			},
			{
				leave_id: "leave_6",
				dates: ["2023-10-14", "2023-10-15"],
				status: "Pending",
			},
			{
				leave_id: "leave_7",
				dates: ["2023-10-16", "2023-10-17"],
				status: "Approved",
			},
			{
				leave_id: "leave_8",
				dates: ["2023-10-18", "2023-10-19", "2023-10-20"],
				status: "Pending",
			},
			{
				leave_id: "leave_9",
				dates: ["2023-10-21"],
				status: "Approved",
			},
			{
				leave_id: "leave_10",
				dates: ["2023-10-22", "2023-10-23", "2023-10-24"],
				status: "Pending",
			},
		],
	};
	render() {
		console.log("Leaves");

		return (
			<section className="leaves">
				<h1>Leaves</h1>
				<table
					cellSpacing={10}
					style={{
						width: "100%",
						border: "1px solid black",
					}}
				>
					<thead>
						<tr>
							<th>Leave ID</th>
							<th>Dates</th>
							<th>Status</th>
						</tr>
					</thead>
					{this.state.leaves.map((leaveObj) => {
						return (
							<tr>
								<td>{leaveObj.leave_id}</td>
								<td>{leaveObj.dates.join(", ")}</td>
								<td>{leaveObj.status}</td>
							</tr>
						);
					})}
				</table>
				<a href="/dashboard/leaves/new">
					<button>Request new leave</button>
				</a>
			</section>
		);
	}
}

export default Leaves;
