// HTML 파일에서 참조하거나, 혹은 이 파일의 상단에서 import 문법을 사용하여 가져와야 합니다.
// <script src="rooms.js"></script>
import rooms from './rooms.js'

$(document).ready(function() {
    for(let roomNumber in rooms) {
        const room = rooms[roomNumber];
        
        let modal = `
        <div class="modal fade" id="modal${roomNumber}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Room ${roomNumber}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- 예약 폼 -->
                        <form id="bookingForm${roomNumber}">
                            <div class="form-group">
                                <label for="guestName${roomNumber}">Guest Name</label>
                                <input type="text" id="guestName${roomNumber}" class="form-control">
                            </div>
                            <!-- 기존 코드 생략... -->
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="cancelBtn${roomNumber}" type="button" class="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.innerHTML += modal;

        $(`#room${roomNumber}`).click(function() {
            $(`#modal${roomNumber}`).modal('show');
            $(`#roomType${roomNumber}`).val(room.type);
            $(`#roomPrice${roomNumber}`).val(room.price);
        });

        $(`#bookingForm${roomNumber}`).submit(function(e) {
            e.preventDefault();
            var guestName = $(`#guestName${roomNumber}`).val();
            var guestPhone = $(`#guestPhone${roomNumber}`).val();
            $(`#room${roomNumber}`).html(`Room ${roomNumber} - Booked (${guestName}:${guestPhone})<br><div style="background-color: red; height: 20px; width: 20px; border-radius: 50%; display: inline-block;"></div>`);
            $(`#bookingForm${roomNumber}`).hide();
            $(`#cancelBtn${roomNumber}`).show();
        });

        $(`#cancelBtn${roomNumber}`).click(function() {
            $(`#room${roomNumber}`).html(`Room ${roomNumber} - Vacant Room<br><div style="background-color: green; height: 20px; width: 20px; border-radius: 50%; display: inline-block;"></div>`);
            $(`#cancelBtn${roomNumber}`).hide();
            $(`#bookingForm${roomNumber}`).show();
        });
    }
});
