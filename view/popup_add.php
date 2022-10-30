<div class="modal fade modalEventBg" id="addModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Add event</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div>
                <hr>
            </div>
            <div class="modal-body">
                <form method="post" action="modules/add_event.php">
                    <div class="form-floating text-black mb-4">
                        <input type="text" class="form-control" id="eventName" placeholder="eventName" name="eventName" required>
                        <label for="eventName">Event name...</label>
                    </div>
                    <div class="form-floating text-black mb-4">
                        <textarea type="text" class="form-control" id="eventDescr" placeholder="eventName" style="min-height: 132px" name="eventDescr" required></textarea>
                        <label for="eventName">Event description...</label>
                    </div>
                    <div class="form-floating text-black mb-4">
                        <input type="text" class="form-control" id="eventLocation" placeholder="eventLocation" name="eventLocation" required>
                        <label for="eventLocation">Location...</label>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-auto">
                            <div id="popupDate" class="eventTime mt-1 pb-2"></div>
                        </div>
                        <div class="col-sm">
                            <input type="hidden" class="form-control" id="eventDate" placeholder="eventDate" name="eventDate" required>
                            <input type="time" class="form-control" id="eventTime" placeholder="eventTime" name="eventTime" value="00:00">
                        </div>
                    </div>
                    <select class="form-select mb-4" id="floatingSelect" name="eventType">
                        <option value="1" selected>Meeting with an expert</option>
                        <option value="2">Question-answer</option>
                        <option value="3">Conference</option>
                        <option value="4">Webinar</option>
                    </select>
                    <div class="modal-footer">
                        <button type="button" class="buttonBlack" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="buttonPink">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>