var RAW_GITHUB_PREFIX = 'https://raw.githubusercontent.com/alexfetisov/valentine/master/img';

function Heart(index) {
  if (index != undefined) {
    this.index = index;
  }
  this.$heart = $('<div onclick=\'HideHeart(' + index + ')\' />');
  this.show = false;
  this.$heart.css({
    'display': 'none',
    'position': 'absolute',
    'margin': 0,
    'padding': 0,
    'border': 0,
    'background-image': 'url("' + RAW_GITHUB_PREFIX + '/h' + ((index % N_HEARTS) + 1) + '.png")',
    'width': '100px',
    'height': '120px',
    'background-repeat': 'no-repeat',
    'transition': '1000ms linear all'
  });

  this.$heart.attr('id', 'heart' + index);
  this.$heart.attr('pointer-events', 'visibleFill');

  this.IsShow = function() {
    if (this.show) {
      return true;
    }
    return false;
  };

  this.AdjustX = function(x) {
    var shift = $(window).scrollLeft();
    var screenWidth = window.innerWidth;
    var oneFourOfWidth = screenWidth / 4;
    // Check if it goes out of screen
    if (x < oneFourOfWidth) {
      x = screenWidth - x;
    }
    if (x < 100) {
      x = 100;
    }
    var right_most = screenWidth - this.$heart.width() - 20;
    if (x > right_most) {
      x = right_most;
    }
    x += shift;
    return x;
  };

  this.AdjustY = function(y) {
    var shift = $(window).scrollTop();
    var screenHeight = window.innerHeight;
    var bottom_most = screenHeight - this.$heart.height() - 20;
    if (y > bottom_most) {
      y = bottom_most;
    }
    if (y < 100) {
      y = 100;
    }
    y += shift;
    return y;
  };

  this.SetPosition = function(x, y) {
    this.$heart.css({
      'display': 'block',
      'left': x.toString() + 'px',
      'top': y.toString() + 'px'
    });
  };

  this.SetRandomPosition = function() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var x = Math.floor(Math.random() * screenWidth); 
    var y = Math.floor(Math.random() * screenHeight); 
    x = this.AdjustX(x);
    y = this.AdjustY(y);
    this.SetPosition(x, y);
  };

  this.Hide = function() {
    this.show = false;
    this.$heart.css({
      'display': 'none'
    });
  };

  this.AppendToBody = function() {
    $('body').append(this.$heart); 
  }

  this.Show = function() {
    this.show = true;
  };

  this.RotateRight = function() {
    this.$heart.css({
      'transform': 'rotate(30deg)'
    })
  };

  this.RotateLeft = function() {
    this.$heart.css({
      'transform': 'rotate(-30deg)'
    })
  };
}

var MAX_HEARTS = 25;
var N_HEARTS = 6;

var allHearts = [];

function HideHeart(id) {
  $('#heart' + id).css({
    'visibility': 'hidden'
  })
}

function CanShow() {
  var viewPortWidth = window.innerWidth;
  var viewPortHeight = window.innerHeight;
  if (viewPortHeight < 500 || viewPortWidth < 500) {
    return false;
  }
  return true;
}

function ShowHeart(id) {
  if (!CanShow()) {
    HideHeart();
    return;
  }
  var index = Math.floor(Math.random() * N_HEARTS) + 1;
  $('#heart' + id).css({
    'visibility': 'visible',
    'background-image': 'url("' + RAW_GITHUB_PREFIX + '/h' + index + '.png")'
  });
}

function IsVisible(id) {
  return document.getElementById('heart' + id).style.visibility === 'visible';
}

function IsInvisible(id) {
  return document.getElementById('heart' + id).style.visibility === 'hidden';
}

function InitHeart(id) {
  ShowHeart(id);
  if (!CanShow()) return;
  allHearts[id].SetRandomPosition();
  // Set up rotation
  setInterval(function() {
    allHearts[id].RotateRight();
    setTimeout(function() {
      allHearts[id].RotateLeft();
    }, 4000);
  }, 8000);
  // Set up moves
  setInterval(function() {
    allHearts[id].SetRandomPosition();        
  }, 5000);
  allHearts[id].Show();
  allHearts[id].RotateLeft();
}

function StartHearts() {
  for (var i = 0; i < MAX_HEARTS; ++i) {
    allHearts[i] = new Heart(i);   
    allHearts[i].AppendToBody();
  }
  var id = Math.floor(Math.random() * MAX_HEARTS);
  InitHeart(id);
  setInterval(function() {
    var id = Math.floor(Math.random() * MAX_HEARTS);
    if (IsInvisible(id)) {
      ShowHeart(id);
    } else if (IsVisible(id)) {
      HideHeart(id);
    } else {
      InitHeart(id);
    }
  }, 4000);
}

function MoveOneHeartToViewport() {
  var moved = false;
  for (var i = 0; i < MAX_HEARTS; ++i) {
    if (IsVisible(i)) {
      allHearts[i].SetRandmonPosition();
      moved = true;
    }
  }
  if (!moved) {
    InitHeart(0);
  }
}

function CheckCanShow() {
  if (CanShow()) return;
  for (var i = 0; i < MAX_HEARTS; ++i) {
    if (IsVisible(i)) {
      HideHeart(i);
    }
  }
}

$(document).ready(function() {
  StartHearts();
  $(window).resize(function() {
    CheckCanShow();
  })
  $(window).scroll(function() {
    MoveOneHeartToViewport();
  });
});
